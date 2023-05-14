/********************************************************
Represents details of a particular product. When a
consumer visits this page, he/she may add a product to
the sopping cart. If an administrator visits the page, the
view will switch to amin mode and provide the option to
edit the product.

@author
*********************************************************/

//=======================================================

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.model';
import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { User } from 'src/models/user.model';
import { Cart } from 'src/models/cart.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../app.reducer';
import * as ShoppingCartActions from '../../../shopping-cart/store/shopping-cart.actions';
import { Router } from '@angular/router';

//=======================================================

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Output() switchToEditMode = new EventEmitter();
  user: User = null;

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>,
    private router: Router) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser() {
    this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnChanges() {}

  handleButtonClick() {
    if (this.userIsAdmin()) {
      this.switchToEditMode.emit();
    } else {
      if (this.user !== null) {
        this.addToCart(this.product.id);
      } else {
        this.router.navigate(['account/login']);
      }
    }
  }

  userIsAdmin() {
    return this.authenticationService.userIsAdmin(this.user);
  }

  addToCart(productId: string) {
    const userId: string = this.user.userId;
    const cart: Cart = new Cart(userId, productId, 1);
    this.store.dispatch(new ShoppingCartActions.AddToCart(cart));
  }
}

//=======================================================
