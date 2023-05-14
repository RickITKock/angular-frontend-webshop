/*****************************************************************************
Controls which mode an administrator is in and loads a product with the
corresponding id, if any, in the address bar.

@author
******************************************************************************/

//=============================================================================

import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as fromProduct from '../store/product.reducer';

export const MUTATE: string = 'MUTATE';
export const DETAILS: string = 'DETAILS';

//=============================================================================

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  noImageFoundImagePath: string = "https://www.wiersmaverhuizingen.nl/wp-content/themes/consultix/images/no-image-found-360x260.png";
  visitedDetailsPage: boolean = false;
  productPageMode: string = null;
  updatedImageSub: Subscription;
  currentProduct: Product;
  failedLoadingImage: boolean = false;
  productState: Observable<fromProduct.State>

  @ViewChild('imagePath', {static: true}) imagePath: ElementRef;

  constructor(
    private router: Router,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    const mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.productPageMode = mode.toUpperCase();
    const productId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.resolveProductByIdUsingAddressBar(productId);
    if (!productId) {
      this.currentProduct = new Product();
      this.currentProduct.imagePath = this.noImageFoundImagePath;
    }
    this.updateImageSubscription();
  }

  private resolveProductByIdUsingAddressBar(productId: number): void {
    if (productId !== null) {
      let id: number;
      this.activatedRoute.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(productId => {
            id = productId;
            this.productState = this.store.select('products');
            return this.store.select('products');
          }),
          map(productState => {
            return productState.products.find((product) => {
              return +product.id === id;
            })
          })
        ).subscribe(product => {
          if (!product) {
            this.loadImageNotfound();
          } else {
            this.currentProduct = product;
          }
        })
    }
  }

  private updateImageSubscription() {
    this.updatedImageSub = this.productService.updatedImagePath.subscribe(data => {
      this.currentProduct.imagePath = data;
    });
  }

  onError() {
    this.loadImageNotfound();
    this.failedLoadingImage = true;
  }

  loadImageNotfound() {
    if (this.currentProduct) { this.currentProduct.imagePath = this.noImageFoundImagePath; }
  }

  handleSwitchToEditMode() {
    this.router.navigate([`/product/mutate/${this.currentProduct.id}`]);
    this.visitedDetailsPage = true;
    this.productPageMode = MUTATE;
  }

  handleSwitchToDetailsMode() {
    this.router.navigate([`/product/details/${this.currentProduct.id}`]);
    this.visitedDetailsPage = false;
    this.productPageMode = DETAILS;
  }

  ngOnDestroy() {
    if (this.updatedImageSub != null) {
      this.updatedImageSub.unsubscribe();
    }
  }
}

//=============================================================================
