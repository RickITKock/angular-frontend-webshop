/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/app/auth.guard';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

import * as PRODUCT_ROUTES from './product/product.routes';
import * as AUTH_ROUTES from './auth/auth.routes';
import * as SHOPPING_CART_ROUTES from './shopping-cart/shopping-cart.routes';

//=============================================================================

const appRoutes : Routes = [
  {
    path: PRODUCT_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./product/product.module").then(m => m.ProductModule),
    canActivate: [AuthGuard],
    data: { applyPreload: true }
  },
  {
    path: AUTH_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthenticationModule),
    canActivate: [AuthGuard],
    data: { applyPreload: false }
  },
  {
    path: SHOPPING_CART_ROUTES.ABSOLUTE_PATH_DEFAULT,
    loadChildren: () => import("./shopping-cart/shopping-cart-routing.module").then(m => m.ShoppingCartRoutingModule),
    data: { applyPreload: false }
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
]

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { preloadingStrategy: CustomPreloadingStrategy })],
  providers: [ AuthGuard ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

//=============================================================================
