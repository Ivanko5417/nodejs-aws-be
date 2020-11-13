import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import { Product } from '../types';
import * as productService from '../services/product/product.service';
import { processError, processResponse } from '../utils/response.helper';
import { logRequest } from '../utils/logging';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  logRequest(event);

  try {
    const productToCreate: Product = JSON.parse(event.body);

    return processResponse(await productService.createProduct(productToCreate));
  } catch (err) {
    return processError(err);
  }
}
