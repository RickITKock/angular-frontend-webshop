/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../app.reducer';
import * as fromShoppingCart from '../store/shopping-cart.reducer';
import { Router } from '@angular/router';

//=============================================================================

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shoppingCartState: Observable<fromShoppingCart.State>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) {}

  ngOnInit() {
    this.shoppingCartState = this.store.select('shoppingCart');
    this.shoppingCartState.subscribe((state) =>{
      if (state.numberOfItems === 0) {
        this.router.navigate(['/']);
      }
    })
  }
}

//=============================================================================
