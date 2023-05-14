/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Product } from './product.model';
import { Cart } from './cart.model';

export class ShoppingCartItem {
  constructor (
      public products: Product,
      public carts: Cart,
      public state?: string,
      public visible?: boolean
  ) {}
}

//=============================================================================
