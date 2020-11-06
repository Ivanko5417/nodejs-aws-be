import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import { Product } from '../types';
import * as productService from '../services/db/product';
import { processError, processResponse } from '../utils/response.helper';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  try {
    const productToCreate: Product = JSON.parse(event.body);

    return processResponse(await productService.createProduct(productToCreate));
  } catch (err) {
    return processError(err);
  }
}
