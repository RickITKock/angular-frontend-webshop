/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ShoppingCartRoutingModule } from "./shopping-cart-routing.module";
import { ShoppingCartComponent } from "./shopping-cart.component";

//=============================================================================

@NgModule({
  imports: [SharedModule, ShoppingCartRoutingModule],
  declarations: [ShoppingCartComponent, CheckoutComponent],
})
export class ShoppingCartModule {}

//=============================================================================
