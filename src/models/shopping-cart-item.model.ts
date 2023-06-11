/*****************************************************************************
@author Rick Kock
******************************************************************************/

//=============================================================================

import { Cart } from "./cart.model";
import { Product } from "./product.model";

export class ShoppingCartItem {
  constructor(
    public products: Product,
    public carts: Cart,
    public state?: string,
    public visible?: boolean
  ) {}
}

//=============================================================================
