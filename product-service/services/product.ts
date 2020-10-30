import type { Product } from '../types';
import products from './products.json';
import { NotFound } from '../exceptions';

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product {
  const foundProduct = products.find((product) => product.id === id);
  if (!foundProduct) {
    throw new NotFound(`Product with id = [${id}] was not found`);
  }
  return foundProduct;
}
