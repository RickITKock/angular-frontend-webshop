/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ShoppingCartActions from './shopping-cart.actions';
import { Cart } from 'src/models/cart.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';

//=============================================================================

const SHOPPING_CART_URL:string = 'http://localhost:8080/shoppingCart';

export interface CartResponseData {
  userId: number;
  productId: number;
  amount: number;
}

const handleError = (errorResponse: any) => {
  const errorMessage: string = 'An unknown error has occurred';
  return of(new ShoppingCartActions.AddOrUpdateCartFail(errorMessage));
}

const handleSucessfulAddOrUpdateCart = (userId: number) => {
  return new ShoppingCartActions.FetchShoppingCart(userId);
}

//=============================================================================

@Injectable()
export class ShoppingCartEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  addToCart = this.actions$.pipe(
    ofType(ShoppingCartActions.ADD_TO_CART),
    switchMap((data: ShoppingCartActions.AddToCart) => {
      return this.http.post<Cart>(SHOPPING_CART_URL, data.payload)
      .pipe(
        map(() => {
          return handleSucessfulAddOrUpdateCart(+data.payload.userId);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  updateCart = this.actions$.pipe(
    ofType(ShoppingCartActions.UPDATE_CART),
    switchMap((data: ShoppingCartActions.UpdateCart) => {
      let userId: string = data.payload.userId;
      let productId: string = data.payload.productId;

      return this.http.put<Cart>(`${SHOPPING_CART_URL}/${userId}/${productId}`, data.payload)
      .pipe(
        map(() => {
          return handleSucessfulAddOrUpdateCart(+userId);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  fetchShoppingCart = this.actions$.pipe(
    ofType(ShoppingCartActions.FETCH_SHOPPING_CART),
    switchMap((shoppingCartActions: ShoppingCartActions.FetchShoppingCart) => {
      return this.http.get<ShoppingCartItem[]>(
        `${SHOPPING_CART_URL}/${shoppingCartActions.payload}`
      ).pipe(
        map((shoppingCart: ShoppingCartItem[]) => {
          return shoppingCart.map(shoppingCartItem => {
            if (shoppingCartItem != null) {
              return {
                ...shoppingCartItem,
                state: 'normal',
                visible: true
              }
            }
          })
        }),
        map((shoppingCart) => {
          return new ShoppingCartActions.FetchSuccess(shoppingCart);
        })
      )
    })
  )

  @Effect()
  productsDeleteOneProduct = this.actions$.pipe(
    ofType(ShoppingCartActions.DELETE_CART_ITEM),
    switchMap((productData: ShoppingCartActions.DeleteCartItem) => {
      let userId: number = productData.payload.userId;
      let productId: number = productData.payload.productId;

      return this.http.delete<Cart>(`${SHOPPING_CART_URL}/${userId}/${productId}`)
        .pipe(
          map(() => { return new ShoppingCartActions.FetchShoppingCart(userId)}),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect()
  productsDeleteAllProducts = this.actions$.pipe(
    ofType(ShoppingCartActions.DELETE_ALL_CART_ITEMS),
    switchMap((productData: ShoppingCartActions.DeleteAllCartItems) => {
      let userId = productData.payload;

      return this.http.delete(`${SHOPPING_CART_URL}/${userId}`)
        .pipe(
          map(() => { return new ShoppingCartActions.FetchShoppingCart(userId)}),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )
}

//==============================================================================
