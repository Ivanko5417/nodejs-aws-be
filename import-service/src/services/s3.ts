import AWS from 'aws-sdk';
import { REGION } from '../constants';
import { config } from '../config';

const s3 = new AWS.S3({ region: REGION })

export function getSignedUrl(key) {
  return s3.getSignedUrlPromise('putObject', {
    Bucket: config.s3.bucketName,
    Key: `uploaded/${key}`,
    Expires: 60,
    ContentType: 'text/csv'
  });
}
