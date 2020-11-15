import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import { ValidationError } from '../exceptions';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
      throw new ValidationError('name cannot be empty');
    }
    return processResponse({ ok: true });
  } catch (err) {
    return processError(err);
  }
}
