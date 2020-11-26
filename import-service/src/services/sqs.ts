import AWS from 'aws-sdk';
import { config } from '../config';

const sqs = new AWS.SQS({ region: config.aws.region });
const queueUrl = `https://sqs.${config.aws.region}.amazonaws.com/${config.aws.accountNumber}/${config.sqs.queueName}`;

export function sendMessage(message: string | object) {
  console.log('Message to send to SQS: ', message);
  const messageToSend = typeof message === 'object'
    ? JSON.stringify(message)
    : message;
  return sqs.sendMessage({
    QueueUrl: queueUrl,
    MessageBody: messageToSend
  }).promise();
}
