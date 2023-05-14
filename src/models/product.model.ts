/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public imagePath?: string,
    public price?: number,
    public stock?: number,
    public state?: string,
    public visible?: boolean
    ) {}
}

//=============================================================================
