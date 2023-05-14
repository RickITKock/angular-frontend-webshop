/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ProductActions from './product.actions';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Product } from 'src/models/product.model';
import { of } from 'rxjs';

//=============================================================================

const PRODUCTS_URL:string = 'http://localhost:8080/products';

export interface ProductResponseData {
  id: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  stock: number
}

const handleFetching = (
  id: string,
  name: string,
  description: string,
  imagePath: string,
  price: number,
  stock: number
) => {
  const product = new Product(
    id, name, description, imagePath, price, stock, 'normal', true
  )

  return new ProductActions.FetchSuccess(product)
}

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new ProductActions.MutateFail(errorMessage));
  }
  return of(new ProductActions.MutateFail(errorMessage));
}

const handleSucessfulMutation = () => {
  return new ProductActions.MutateSuccess(true);
}

const getCorrectMutationRequest = (http: HttpClient, product: Product) => {
  if (product.id) {
    return http.put<ProductResponseData>(
      PRODUCTS_URL,
      product
    )
  }
  return http.post<ProductResponseData>(
    PRODUCTS_URL,
    product
  )
}

//=============================================================================

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  productsDeleteOneProduct = this.actions$.pipe(
    ofType(ProductActions.DELETE_PRODUCT),
    switchMap((productData: ProductActions.DeleteProduct) => {
      let id: number = productData.payload;

      return this.http.delete<Product>(`${PRODUCTS_URL}/${id}`)
        .pipe(
          map(() => { return new ProductActions.FetchProducts(); }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect()
  productsDeleteAllProducts = this.actions$.pipe(
    ofType(ProductActions.DELETE_ALL_PRODUCTS),
    switchMap(() => {
      return this.http.delete(PRODUCTS_URL)
        .pipe(
          map(() => { return new ProductActions.FetchProducts(); }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      )
    })
  )

  @Effect()
  productsFetchOneProduct = this.actions$.pipe(
    ofType(ProductActions.FETCH_START),
    switchMap((productData: ProductActions.FetchStart) => {
      return this.http
        .get<Product>(`${PRODUCTS_URL}/${productData.payload}`)
        .pipe(
          map(responseData => {
            return handleFetching(
              responseData.id,
              responseData.name,
              responseData.description,
              responseData.imagePath,
              responseData.price,
              responseData.stock
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  startMutatingProduct = this.actions$.pipe(
    ofType(ProductActions.START_MUTATE),
    switchMap((data: ProductActions.StartMutatingProduct) => {
      return getCorrectMutationRequest(this.http, data.payload)
      .pipe(
        map(() => {
          return handleSucessfulMutation();
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  fetchAllProducts = this.actions$.pipe(
    ofType(ProductActions.FETCH_PRODUCTS),
    switchMap(() => {
      return this.http.get<Product[]>(PRODUCTS_URL);
    }),
    map(products => {
      return products.map(product => {
        return {
          ...product,
          state: 'normal',
          visible: true
        };
      });
    }),
    map(products => {
      return new ProductActions.SetProducts(products);
    })
  );
}

//==============================================================================
