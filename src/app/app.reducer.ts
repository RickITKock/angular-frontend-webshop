/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { ActionReducerMap } from '@ngrx/store';
import * as fromProducts from './product/store/product.reducer';
import * as fromAuthentication from './auth/store/auth.reducer';
import * as fromShoppingCart from './shopping-cart/store/shopping-cart.reducer';

export interface AppState {
  products: fromProducts.State;
  authentication: fromAuthentication.State;
  shoppingCart: fromShoppingCart.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productReducer,
  authentication: fromAuthentication.authenticationReducer,
  shoppingCart: fromShoppingCart.shoppingCartReducer
}

//=============================================================================
