import { importProductsFile } from '../handler';
import { HEADERS } from '../src/utils/response.helper';
import * as s3Service from '../src/services/s3';
import { ValidationError } from '../src/exceptions';

jest.mock('../src/services/s3')

const validMockEvent = { queryStringParameters: { name: 'some name' } };

describe('importProductsFile handler', () => {
  test('Successful response', async () => {
    const link = "https://bucket.amazon.com";

    const successfulResponse = {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify(link)
    }
    // @ts-ignore
    s3Service.getSignedUrl.mockReturnValue(link);

    // @ts-ignore
    expect(await importProductsFile(validMockEvent)).toEqual(successfulResponse)
  })
  test('Validation error', async () => {
    const validationErrorResponse = {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify({ message: `name cannot be empty` })
    }

    const mockEvent = { queryStringParameters: {} };

    // @ts-ignore
    s3Service.getSignedUrl.mockImplementation(() => {
      throw new ValidationError();
    });


    // @ts-ignore
    expect(await importProductsFile(mockEvent)).toEqual(validationErrorResponse)
  })
  test('Server error', async () => {
    const serverErrorResponse = {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: `Internal Server Error` })
    }

    // @ts-ignore
    s3Service.getSignedUrl.mockImplementation(() => {
      throw new Error();
    });

    // @ts-ignore
    expect(await importProductsFile(validMockEvent)).toEqual(serverErrorResponse)
  })
});
