import { performQuery, performQueryWithTransaction } from '../db/db';
import type { Product } from '../../types';
import { NotFound } from '../../exceptions';
import { PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } from '../../constants';

const productFields = ['id', 'title', 'description', 'price', 'count'];


export async function getProducts(): Promise<Product[]> {
  const query = `SELECT ${productFields} FROM ${PRODUCTS_TABLE_NAME} inner join ${STOCKS_TABLE_NAME} on id = product_id where count > 0;`;
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

// export async function createProduct(productToCreate: Product): Promise<Product> {
export async function createProduct(productToCreate: Product) {
  const productQuery = {
    text: `INSERT INTO
        ${PRODUCTS_TABLE_NAME}(title, description, price)
        VALUES($1, $2, $3) RETURNING *`,
    values: [
      productToCreate.title,
      productToCreate.description,
      productToCreate.price,
    ]
  };

  const createStock = (prevValues) => ({
    text: `INSERT INTO
        ${STOCKS_TABLE_NAME}(product_id, count)
        VALUES($1, $2) RETURNING count;`,
    values: [
      prevValues[0][0].id,
      productToCreate.count,
    ]
  })
  const result = await performQueryWithTransaction([productQuery, createStock]);
  const createdProduct: Product = result
    .flat()
    .reduce((acc, item) => ({ ...acc, ...item }), {});

  return createdProduct;
}
