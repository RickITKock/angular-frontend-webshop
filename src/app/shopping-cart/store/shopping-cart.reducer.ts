/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import * as Actions from './shopping-cart.actions';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';

//=============================================================================

export interface State {
  numberOfItems: number;
  shoppingCartItems: ShoppingCartItem[];
  shoppingCartError: string;
  loading: boolean;
}

const initialState: State = {
  numberOfItems: 0,
  shoppingCartItems: [],
  shoppingCartError: null,
  loading: false
};

//=============================================================================

export function shoppingCartReducer(state = initialState, action: Actions.ShoppingCartActions) {
  switch (action.type) {

    case Actions.ADD_OR_UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false
      }

      case Actions.ADD_OR_UPDATE_CART_FAIL:
        return {
          ...state,
          loading: false,
          shoppingCartError: action.payload
        }

      case Actions.FETCH_SHOPPING_CART:
        return {
          ...state,
          loading: true,
          shoppingCartError: null
        }

      case Actions.FETCH_SUCCESS:
        let fetchedShoppingCartItems: ShoppingCartItem[]  = [...action.payload];

        let numberOfItemsCounted: number = 0;
        fetchedShoppingCartItems.forEach(item => {
          numberOfItemsCounted += item.carts.amount;
        });

        return {
          ...state,
          loading: false,
          numberOfItems: numberOfItemsCounted,
          shoppingCartItems: fetchedShoppingCartItems
        };

      case Actions.CLEAR_CART:
        return {
          numberOfItems: 0,
          shoppingCartItems: [],
          shoppingCartError: null,
          loading: false
        }

    default:
      return state;
  }
}

//=============================================================================
