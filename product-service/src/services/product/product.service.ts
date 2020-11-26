import * as productDb from './product.db';
import { validateProduct } from './product.validators';
import { Product, ProductToSave } from '../../types';


export function createProduct(productToCreate: ProductToSave): Promise<Product> {
  validateProduct(productToCreate);
  console.log(`Product to save: [${JSON.stringify(productToCreate)}]`);
  return productDb.createProduct(productToCreate);
}

export const getProductById = productDb.getProductById;
export const getProducts = productDb.getProducts;
