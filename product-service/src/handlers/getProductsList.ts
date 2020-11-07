import 'source-map-support/register';
import { getProducts } from '../services/product/product.service';
import { processError, processResponse } from '../utils/response.helper';
import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import { logRequest } from '../utils/logging';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  logRequest(event);

  try {
    return processResponse(await getProducts());
  } catch (err) {
    return processError(err);
  }
}

