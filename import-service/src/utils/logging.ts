import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';

export function logRequest(event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) {
  let logStr = `[${event.httpMethod}] - ${event.resource}.`;
  if (event.queryStringParameters) {
    logStr += ` Query: ${JSON.stringify(event.queryStringParameters)}.`;
  }
  if (event.pathParameters) {
    logStr += ` Params: ${JSON.stringify(event.pathParameters)}.`;
  }
  if (event.body) {
    logStr += ` Body: ${event.body}.`;
  }
  console.log(logStr);
}
