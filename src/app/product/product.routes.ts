/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

export const DEFAULT_PATH = '';
export const CREATE_NEW_PRODUCT_PATH = 'product/:mode';
export const MUTATE_OR_DETAILS_PATH = CREATE_NEW_PRODUCT_PATH.concat('/:id');

export const ABSOLUTE_PATH_DEFAULT = DEFAULT_PATH;
export const ABSOLUTE_PATH_CREATE_PRODUCT = ABSOLUTE_PATH_DEFAULT.concat(`${CREATE_NEW_PRODUCT_PATH}`);
export const ABSOLUTE_PATH_MUTATE_OR_DETAILS = ABSOLUTE_PATH_DEFAULT.concat(`${MUTATE_OR_DETAILS_PATH}`);

//=============================================================================
