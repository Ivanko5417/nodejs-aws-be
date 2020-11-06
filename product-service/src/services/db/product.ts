import { performQuery } from './db';
import type { Product } from '../../types';
import { NotFound } from '../../exceptions';
import { PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } from '../../constants';

const productFields = ['id', 'title', 'description', 'price', 'count'];


export async function getProducts(): Promise<Product[]> {
  const query = `SELECT ${productFields}, id::TEXT as asdasd FROM ${PRODUCTS_TABLE_NAME} inner join ${STOCKS_TABLE_NAME} on id = product_id where count > 0;`;
  return performQuery<Product>(query);
}

export async function getProductById(id: string): Promise<Product> {
  const query = {
    text: `SELECT ${productFields} FROM ${PRODUCTS_TABLE_NAME} inner join ${STOCKS_TABLE_NAME} on id = product_id where id::TEXT = $1;`,
    values: [id]
  }
  const [product] = await performQuery<Product>(query);
  if (!product) {
    throw new NotFound(`Product with id = [${id}] was not found`);
  }
  return product;
}
