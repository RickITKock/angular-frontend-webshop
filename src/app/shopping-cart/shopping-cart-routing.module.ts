/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import * as ROUTES from './shopping-cart.routes';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

//=============================================================================

const shoppingCartRoutes : Routes = [
  { path: 'cart', redirectTo: ROUTES.SHOPPING_CART_PATH },
  { path: ROUTES.SHOPPING_CART_PATH, component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: ROUTES.CHECKOUT_PATH, component: CheckoutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(shoppingCartRoutes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule {}

//=============================================================================
