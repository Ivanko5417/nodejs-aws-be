import { getProductById } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import products from '../src/services/products.json';

describe('getProductsList handler', () => {
  test('Successful response', async () => {
    const productId = products[0].id;

    const successfulResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(products[0])
    }
    const event = {
      pathParameters: { id: productId }
    }

    // @ts-ignore
    expect(await getProductById(event)).toEqual(successfulResponse)
  })
  test('Not found response', async () => {
    const productId = 'wrong id';
    const notFoundResponse = {
      statusCode: 404,
      headers: HEADERS,
      body: JSON.stringify({ message: `Product with id = [${productId}] was not found` })
    }
    const event = {
      pathParameters: { id: productId }
    }

    // @ts-ignore
    expect(await getProductById(event)).toEqual(notFoundResponse)
  })
});
