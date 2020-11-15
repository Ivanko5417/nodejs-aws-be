import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import { ValidationError } from '../exceptions';
import { getSignedUrl } from '../services/s3';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
      throw new ValidationError('name cannot be empty');
    }
    const { name } = event.queryStringParameters;
    const url = await getSignedUrl(name);

    return processResponse(url);
  } catch (err) {
    return processError(err);
  }
}
