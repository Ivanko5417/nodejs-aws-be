import { APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import 'source-map-support/register';
import { config } from '../config';
import { REQUIRED_ENV_VARIABLES } from '../constants';

export default (event: APIGatewayTokenAuthorizerEvent, _, callback: APIGatewayAuthorizerCallback) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  if (event.type !== 'TOKEN') {
    callback('Unauthorized')
    return;
  }
  const token = event.authorizationToken.split(' ')[1];
  const [username, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');
  try {
    if (username === REQUIRED_ENV_VARIABLES[0]) {
      callback(null, generatePolicy(username, password === config.Ivanko5417 ? 'Allow' : 'Deny', event.methodArn))
      return;
    } else {
      callback('Unauthorized')
    }
  } catch (err) {
    console.log(err);
    callback('Unauthorized')
    return;
  }
};

const generatePolicy = function(principalId, effect, resource) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  };
}
