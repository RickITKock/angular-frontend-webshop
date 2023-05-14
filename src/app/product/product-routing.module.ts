/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component'
import { ProductResolverService } from './services/product-resolver.service'
import { ProductItemComponent } from './product-item/product-item.component';
import { AuthGuard } from 'src/app/auth.guard';
import * as ROUTES from './product.routes';

//=============================================================================

const productRoutes : Routes = [
  { path: ROUTES.DEFAULT_PATH, component: ProductComponent, canActivate: [AuthGuard] },
  { path: ROUTES.CREATE_NEW_PRODUCT_PATH, component: ProductItemComponent, canActivate: [AuthGuard] },
  { path: ROUTES.MUTATE_OR_DETAILS_PATH, component: ProductItemComponent, resolve: [ProductResolverService], canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}

//=============================================================================
