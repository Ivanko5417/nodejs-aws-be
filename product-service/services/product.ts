import type { Product } from '../types';
import products from './products.json';

export function getProducts(): Product[] {
  return products;
}
