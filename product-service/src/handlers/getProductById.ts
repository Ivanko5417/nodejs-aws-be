import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import * as productService from '../services/product/product.service';
import { processError, processResponse } from '../utils/response.helper';
import { logRequest } from '../utils/logging';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  logRequest(event);

  try {
    const { id } = event.pathParameters;

    return processResponse(await productService.getProductById(id));
  } catch (err) {
    return processError(err);
  }
}
