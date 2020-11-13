import { createProduct } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import * as productService from '../src/services/product/product.service';
import { Product } from '../src/types';
import { ValidationError } from '../src/exceptions';

jest.mock('../src/services/product/product.service')


const mockProduct: Product = {
  id: 'id',
  title: 'title',
  description: 'description',
  count: 11,
  price: 12
}
const mockEvent = { body: JSON.stringify(mockProduct) };

describe('createProduct handler', () => {
  test('Successful response', async () => {

    const successfulResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(mockProduct)
    }
    // @ts-ignore
    productService.createProduct.mockReturnValue(mockProduct);

    // @ts-ignore
    expect(await createProduct(mockEvent)).toEqual(successfulResponse)
  })
  test('Validation error', async () => {
    const validationErrorResponse = {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ message: `ValidationError` })
    }

    // @ts-ignore
    productService.createProduct.mockImplementation(() => {
      throw new ValidationError();
    });


    // @ts-ignore
    expect(await createProduct(mockEvent)).toEqual(validationErrorResponse)
  })
  test('Server error', async () => {
    const serverErrorResponse = {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: `Internal Server Error` })
    }

    // @ts-ignore
    productService.createProduct.mockImplementation(() => {
      throw new Error();
    });

    // @ts-ignore
    expect(await createProduct(mockEvent)).toEqual(serverErrorResponse)
  })
});
