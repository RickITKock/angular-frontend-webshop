/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth.guard";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductComponent } from "./product.component";
import * as ROUTES from "./product.routes";
import { ProductResolverService } from "./services/product-resolver.service";

//=============================================================================

const productRoutes: Routes = [
  {
    path: ROUTES.DEFAULT_PATH,
    component: ProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.CREATE_NEW_PRODUCT_PATH,
    component: ProductItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.MUTATE_OR_DETAILS_PATH,
    component: ProductItemComponent,
    resolve: [ProductResolverService],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

//=============================================================================
