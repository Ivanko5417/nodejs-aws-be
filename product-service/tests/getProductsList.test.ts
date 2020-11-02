import { getProductsList } from '../handler';
import products from '../src/services/products.json';
import { HEADERS } from '../src/utils/response.helper';

const successfulResponse = {
  statusCode: 200,
  headers: HEADERS,
  body: JSON.stringify(products)
}

describe('getProductsList handler', () => {
  test('Successful response', async () => {
    expect(await getProductsList()).toEqual(successfulResponse)
  })
});
