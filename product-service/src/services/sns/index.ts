import AWS from 'aws-sdk';
import { config } from '../../config';

const sns = new AWS.SNS({ region: config.aws.region });

export function publish(message: string, attributes = {}) {
  return sns.publish({
    Message: message,
    TopicArn: config.sns.topic,
    MessageAttributes: attributes
  }).promise()
}
