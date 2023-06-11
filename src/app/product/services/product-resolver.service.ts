/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Product } from "src/models/product.model";
import * as fromApp from "../../app.reducer";
import * as ProductActions from "../store/product.actions";

//=============================================================================

@Injectable({
  providedIn: "root",
})
export class ProductResolverService implements Resolve<Product[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("products").pipe(
      take(1),
      map((productState) => {
        return productState.products;
      }),
      switchMap((products) => {
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
    );
  }
}

//=============================================================================
