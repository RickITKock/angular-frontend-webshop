/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./../shared/shared.module";
import { AdminComponent } from "./admin/admin.component";
import { ConsumerComponent } from "./consumer-products/consumer-products.component";
import { ProductDetailComponent } from "./product-item/product-detail/product-detail.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductMutationComponent } from "./product-item/product-mutation/product-mutation.component";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

//=============================================================================

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
  ],
  declarations: [
    ProductComponent,
    ProductItemComponent,
    AdminComponent,
    ConsumerComponent,
    ProductDetailComponent,
    ProductMutationComponent,
  ],
})
export class ProductModule {}

//=============================================================================
