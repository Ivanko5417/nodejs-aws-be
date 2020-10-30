import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import * as productService from '../services/product';
import { NotFound } from '../exceptions';
import { processError, processResponse } from '../utils/response.helper';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  try {
    // instead of ignoring ts warning. This is impossible case, because if pathParameters is null this lambda won't be invoked
    if (!event.pathParameters) {
      throw new NotFound('Rating was not found');
    }
    const { id } = event.pathParameters;

    return processResponse(productService.getProductById(id));
  } catch (err) {
    return processError(err);
  }
}
