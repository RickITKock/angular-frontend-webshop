/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as AuthenticationActions from '../auth/store/auth.actions';
import * as ShoppingCartActions from '../shopping-cart/store/shopping-cart.actions';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShoppingCart from '../shopping-cart/store/shopping-cart.reducer';
import { Observable, of } from 'rxjs';

//=============================================================================

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  shoppingCartState: Observable<fromShoppingCart.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.authState = this.store.select('authentication');
    this.shoppingCartState = this.store.select('shoppingCart');
  }

  onLogout() {
    this.store.dispatch(new ShoppingCartActions.ClearCart())
    this.store.dispatch(new AuthenticationActions.Logout());
  }
}

//=============================================================================
