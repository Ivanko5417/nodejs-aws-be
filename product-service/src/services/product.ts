import type { Product } from '../types';
import products from './products.json';
import { NotFound } from '../exceptions';

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product> {
  const foundProduct = products.find((product) => product.id === id);
  if (!foundProduct) {
    throw new NotFound(`Product with id = [${id}] was not found`);
  }
  return foundProduct;
}