import { getProductsList } from '../handler';
import products from '../src/services/products.json';

const successfulResponse = {
  statusCode: 200,
  body: JSON.stringify(products)
}

describe('getProductsList handler', () => {
  test('Successful response', async () => {
    expect(await getProductsList()).toEqual(successfulResponse)
  })
});
