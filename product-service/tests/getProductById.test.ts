import { getProductById } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import * as productService from '../src/services/product/product.service';
import { Product } from '../src/types';
import { NotFound } from '../src/exceptions';

jest.mock('../src/services/product/product.service')

const mockProduct: Product = {
  id: 'id',
  title: 'title',
  description: 'description',
  count: 11,
  price: 12
}

describe('getProductById handler', () => {
  test('Successful response', async () => {
    const productId = mockProduct.id;

    const successfulResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(mockProduct)
    }
    // @ts-ignore
    productService.getProductById.mockReturnValue(mockProduct);
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
    productService.getProductById.mockImplementation(() => {
      throw new NotFound(`Product with id = [${productId}] was not found`);
    });

    // @ts-ignore
    expect(await getProductById(event)).toEqual(notFoundResponse)
  })
});
