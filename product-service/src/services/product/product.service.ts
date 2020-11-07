import * as productDb from './product.db';
import { validateProduct } from './product.validators';
import { Product } from '../../types';


export function createProduct(productToCreate): Promise<Product> {
  validateProduct(productToCreate);
  return productDb.createProduct(productToCreate);
}

export const getProductById = productDb.getProductById;
export const getProducts = productDb.getProducts;
