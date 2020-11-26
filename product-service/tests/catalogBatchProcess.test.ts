import { catalogBatchProcess } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import * as productService from '../src/services/product/product.service';
import { publish } from '../src/services/sns';
import { Product, SQSProduct } from '../src/types';
import { ValidationError } from '../src/exceptions';

jest.mock('../src/services/product/product.service')
jest.mock('../src/services/sns')


const mockProductSQS: SQSProduct = {
  title: 'title',
  description: 'description',
  count: '11',
  price: '12'
}
const mockProduct: Product = {
  title: 'title',
  description: 'description',
  count: 11,
  price: 12,
  id: 'random'
}

const mockEvent = { Records: [{ body: JSON.stringify(mockProductSQS) }]};
const mockEventSeveralProducts = { Records: [{ body: JSON.stringify(mockProductSQS) }, { body: JSON.stringify(mockProductSQS) }]};

describe('catalogBatchProcess handler', () => {
  beforeEach(() => {
    // @ts-ignore
    publish.mockClear()
    // @ts-ignore
    publish.mockReturnValue(null);
  })
  test('Successful response', async () => {
    const successfulResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify([mockProduct])
    }
    // @ts-ignore
    productService.createProduct.mockReturnValue(mockProduct);

    // @ts-ignore
    expect(await catalogBatchProcess(mockEvent)).toEqual(successfulResponse)
    expect(publish).toHaveBeenCalledTimes(1);
  })
  test('Save only valid products', async () => {
    const validationErrorResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify([null, mockProduct])
    }

    // @ts-ignore
    productService.createProduct.mockImplementationOnce(() => {
      throw new ValidationError();
    });
    // @ts-ignore
    productService.createProduct.mockReturnValue(mockProduct);

    // @ts-ignore
    expect(await catalogBatchProcess(mockEventSeveralProducts)).toEqual(validationErrorResponse)
    expect(publish).toHaveBeenCalledTimes(1);
  })
  test('Server error', async () => {
    const serverErrorResponse = {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: `Internal Server Error` })
    }

    // @ts-ignore
    expect(await catalogBatchProcess({})).toEqual(serverErrorResponse)
  })
});
