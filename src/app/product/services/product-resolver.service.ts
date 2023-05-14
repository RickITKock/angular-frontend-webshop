/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import * as ProductActions from '../store/product.actions';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from 'src/models/product.model';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

//=============================================================================

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('products').pipe(
      take(1),
      map(productState => {
        return productState.products;
      }),
      switchMap(products => {
        if (products.length === 0) {
          this.store.dispatch(new ProductActions.FetchProducts());
          return this.actions$.pipe(
            ofType(ProductActions.SET_PRODUCTS),
            take(1)
          );
        } else {
          return of(products);
        }
      })
    )
  }
}

//=============================================================================
