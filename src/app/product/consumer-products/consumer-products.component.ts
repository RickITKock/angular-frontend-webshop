/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthenticationService } from "src/app/auth/services/auth.service";
import { Cart } from "src/models/cart.model";
import { Product } from "src/models/product.model";
import { User } from "src/models/user.model";

import * as fromApp from "../../app.reducer";
import * as AUTH_ROUTES from "../../auth/auth.routes";
import * as ShoppingCartActions from "../../shopping-cart/store/shopping-cart.actions";
import * as PRODUCT_ROUTES from "../product.routes";

//=============================================================================

@Component({
  selector: "app-consumer",
  templateUrl: "./consumer-products.component.html",
  styleUrls: ["./consumer-products.component.css"],
})
export class ConsumerComponent implements OnInit {
  @Input() products: Product[];
  @Input() user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  addToCart(productId: string) {
    if (this.user != null) {
      if (this.authenticationService.userIsConsumer(this.user)) {
        const userId: string = this.user.userId;
        const cart: Cart = new Cart(userId, productId, 1);

        this.store.dispatch(new ShoppingCartActions.AddToCart(cart));
      } else {
        this.router.navigate([PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT]);
      }
    } else {
      this.router.navigate([AUTH_ROUTES.ABSOLUTE_PATH_DEFAULT]);
    }
  }
}

//=============================================================================
