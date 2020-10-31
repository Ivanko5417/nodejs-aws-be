import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import * as productService from '../services/product';
import { processError, processResponse } from '../utils/response.helper';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  try {
    const { id } = event.pathParameters;

    return processResponse(productService.getProductById(id));
  } catch (err) {
    return processError(err);
  }
}
