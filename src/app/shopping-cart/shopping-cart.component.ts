/*****************************************************************************
Represents a form for either creating a new product or
editing an existing one.

@author
******************************************************************************/

//=============================================================================

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { slideOutAnimation } from '../shared/animations/fade-out.animation';
import { changeState } from '../shared/animations/change-state.animation';
import { animateOut } from '../shared/animations/animate-out.animation';
import { ShoppingCartItem } from 'src/models/shopping-cart-item.model';
import { Observable } from 'rxjs';
import { Cart } from 'src/models/cart.model';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';

import * as fromApp from '../app.reducer';
import * as fromShoppingCart from './store/shopping-cart.reducer';
import * as ShoppingCartActions from './store/shopping-cart.actions';

//=============================================================================

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [slideOutAnimation, changeState, animateOut]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCartState: Observable<fromShoppingCart.State>;
  hideAllProductsPriorToDeletingThem: boolean = false;
  calledEndAnimationOnce: boolean = false;
  slideOut: string = 'normal';
  shoppingCartItem: ShoppingCartItem = null;
  totalPrice : number = 0;
  user: User = null;

  constructor(
    private authenticationService : AuthenticationService,
    private store: Store<fromApp.AppState>,
    private router: Router
    ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.initializeApplicationUser();
    this.shoppingCartState = this.store.select('shoppingCart');
    this.shoppingCartState.subscribe((state) =>{
      if (state.numberOfItems === 0) {
        this.router.navigate(['/']);
      } else {
        this.totalPrice = 0;
        state.shoppingCartItems.forEach(item => {
          this.totalPrice += item.carts.amount * item.products.price;
        })
      }
    })
  }

  createRange(number: number): number[] {
    let items: number[] = [];

    for(let i = 1; i <= number; i++){ items.push(i);}
    return items;
  }

  initializeApplicationUser() {
    this.authenticationService.getApplicationUser().subscribe((appUser) => { this.user = appUser;});
  }

  goToDetailsPage(id: number) {
    this.router.navigate([`product/details/${id}`]);
  }

  fetchShoppingCart() {
    this.totalPrice = 0;
    this.store.dispatch(new ShoppingCartActions.FetchShoppingCart(+this.user.userId));
  }

  fetchAllProducts() {
    this.hideAllProductsPriorToDeletingThem = false;
  }

  endOfDeleteAllAnimation() {
    if (this.calledEndAnimationOnce == true) {
      this.hideAllProductsPriorToDeletingThem = true;
      this.calledEndAnimationOnce = false;
      this.deleteAllShoppingCartItems();
    }
  }

  startDeletingAllItemsFromShoppingCart() {
    if (this.consumerIsSureToDelete()) {
      this.calledEndAnimationOnce = true;
      this.slideOut = 'slideOut';
    }
  }

  onEndDeleteShoppingCartItemAnimation() {
    if (this.shoppingCartItem !== null) {
      this.shoppingCartItem.visible = false;
      this.deleteShoppingCartItem(+this.user.userId, +this.shoppingCartItem.products.id);
      this.shoppingCartItem = null;
    }
  }

  startDeletingShoppingCartItem(cartItem: ShoppingCartItem) {
    if (this.consumerIsSureToDelete()) {
      cartItem.state = (cartItem.state === 'normal') ? 'slideOut' : 'normal';
      this.shoppingCartItem = cartItem;
    }
  }

  deleteShoppingCartItem(userId: number, productId: number) {
    this.store.dispatch(new ShoppingCartActions.DeleteCartItem({
      userId: userId,
      productId: productId
    }));
  }

  deleteAllShoppingCartItems() {
    this.store.dispatch(new ShoppingCartActions.DeleteAllCartItems(+this.user.userId));
  }

  private consumerIsSureToDelete(): boolean {
    return confirm('Are you sure?');
  }

  updateCart(cart: Cart) {
    this.store.dispatch(new ShoppingCartActions.UpdateCart(cart));
  }

  updateCartAmount(cart: Cart, amount: number) {
    cart.amount = amount;
    this.store.dispatch(new ShoppingCartActions.UpdateCart(cart));
  }
}

//=============================================================================
