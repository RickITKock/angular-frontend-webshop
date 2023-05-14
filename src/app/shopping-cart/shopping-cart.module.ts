/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { SharedModule } from '../shared/shared.module';

//=============================================================================

@NgModule({
  imports: [
    SharedModule,
    ShoppingCartRoutingModule
  ],
  declarations: [
    ShoppingCartComponent,
    CheckoutComponent
  ]
})
export class ShoppingCartModule {}

//=============================================================================
