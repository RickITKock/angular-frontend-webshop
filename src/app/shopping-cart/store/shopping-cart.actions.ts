/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Action } from '@ngrx/store';
import { Cart } from 'src/models/cart.model';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';

export const SET_SHOPPING_CART = '[ShoppingCart] Set Shopping Cart';
export const FETCH_SHOPPING_CART = '[ShoppingCart] Fetch Shopping Cart';
export const FETCH_SUCCESS = '[ShoppingCart] Fetch Shopping Cart Success';

export const CLEAR_CART = '[Cart] Clear cart';
export const ADD_TO_CART = '[Cart] Add To Cart';
export const UPDATE_CART = '[Cart] Update Cart';
export const ADD_OR_UPDATE_CART_FAIL = '[Cart] Adding New Cart Or Updating Cart Fail';
export const ADD_OR_UPDATE_CART_SUCCESS = '[Cart] Adding New Cart Or Updating Cart Success';
export const CLEAR_ERROR = '[Cart] Clear Error';

export const DELETE_CART_ITEM = '[Cart] Delete Cart Item';
export const DELETE_ALL_CART_ITEMS = '[Cart] Delete All Cart Items';

//=============================================================================

export class ClearCart implements Action {
  readonly type = CLEAR_CART;
}

export class SetShoppingCart implements Action {
  readonly type = SET_SHOPPING_CART;

  constructor(public payload: [ShoppingCartItem]) {}
}

export class FetchShoppingCart implements Action {
  readonly type = FETCH_SHOPPING_CART;

  constructor(public payload: number) {}
}

export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS;

  constructor(public payload: ShoppingCartItem[]) {}
}

//=============================================================================

export class AddToCart implements Action {
  readonly type = ADD_TO_CART;

  constructor(public payload: Cart) {}
}

export class UpdateCart implements Action {
  readonly type = UPDATE_CART;

  constructor(public payload: Cart ) {}
}

export class AddOrUpdateCartFail implements Action {
  readonly type = ADD_OR_UPDATE_CART_FAIL;

  constructor(public payload: string) {}
}

export class AddOrUpdateCartSuccess implements Action {
  readonly type = ADD_OR_UPDATE_CART_SUCCESS;
}

//=============================================================================

export class DeleteCartItem implements Action {
  readonly type = DELETE_CART_ITEM;

  constructor(public payload: {userId: number, productId: number}) {}
}

export class DeleteAllCartItems implements Action {
  readonly type = DELETE_ALL_CART_ITEMS;

  constructor(public payload: number) {}
}

//=============================================================================

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type ShoppingCartActions =
  | SetShoppingCart
  | FetchShoppingCart
  | FetchSuccess
  | AddOrUpdateCartFail
  | AddOrUpdateCartSuccess
  | ClearError
  | DeleteCartItem
  | DeleteAllCartItems
  | ClearCart
  | UpdateCart

//=============================================================================
