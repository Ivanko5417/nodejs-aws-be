import { getProductsList } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import * as productService from '../src/services/product/product.service';

const mockProducts = [{
  id: 'id',
  title: 'title',
  description: 'description',
  count: 11,
  price: 12
}, {
  id: 'id1',
  title: 'title1',
  description: 'description1',
  count: 111,
  price: 122
}]

const successfulResponse = {
  statusCode: 200,
  headers: HEADERS,
  body: JSON.stringify(mockProducts)
}

jest.mock('../src/services/product/product.service')


describe('getProductsList handler', () => {
  test('Successful response', async () => {
    // @ts-ignore
    productService.getProducts.mockReturnValue(mockProducts);
    // @ts-ignore
    expect(await getProductsList({})).toEqual(successfulResponse)
  })
});
