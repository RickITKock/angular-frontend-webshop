/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

//=============================================================================

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private store: Store<fromApp.AppState>) { }

  countShoppingCarts() {
    const observable = this.store.select('shoppingCart');
    observable.subscribe((shoppingCartState) => {
      let count = 0;
      shoppingCartState.shoppingCartItems.forEach((cart) => {
        count += cart.carts.amount;
      })
      console.log(count);
    })
  }
}

//=============================================================================
