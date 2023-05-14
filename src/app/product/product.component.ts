/*****************************************************************************
Represents a form for either creating a new product or
editing an existing one.

@author
******************************************************************************/

//=============================================================================

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

import * as fromApp from '../app.reducer';
import * as ProductActions from './store/product.actions';
import * as fromProduct from './store/product.reducer';

//=============================================================================

@Component({
  selector: 'app-home',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  pageToRedirectUserTo : string;
  user: User = null;
  productState: Observable<fromProduct.State>

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.productState = this.store.select('products');
    this.initializeUser();
    this.fetchAllProducts();
  }

  initializeUser() {
    this.authenticationService.getApplicationUser().subscribe(user => {
      this.user = user;
    });
  }

  fetchAllProducts() {
    this.store.dispatch(new ProductActions.FetchProducts())
  }

  userIsConsumer(): boolean {
    return this.authenticationService.userIsConsumer(this.user);
  }

  userIsAdmin(): boolean {
    return this.authenticationService.userIsAdmin(this.user);
  }
}

//=============================================================================
