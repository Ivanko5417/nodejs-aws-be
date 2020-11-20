import AWS from 'aws-sdk';
import { S3_UPLOADED_FOLDER } from '../constants';
import { config } from '../config';

const s3 = new AWS.S3({ region: config.aws.region });

const defaultOptions = {
  Bucket: config.s3.bucketName
};

export function getSignedUrl(key) {
  return s3.getSignedUrlPromise('putObject', {
    ...defaultOptions,
    Key: `${S3_UPLOADED_FOLDER}/${key}`,
    Expires: 60,
    ContentType: 'text/csv'
  });
}

export function getReadableStream(key) {
  return s3.getObject({
    ...defaultOptions,
    Key: key,
  }).createReadStream();
}

export async function moveObject(oldObjectKey: string, newPath: string) {
  const objectName = oldObjectKey.split('/').pop();
  const newObjectKey = newPath ? `${newPath}/${objectName}` : objectName;

  await s3.copyObject({
    ...defaultOptions,
    CopySource: `${config.s3.bucketName}/${oldObjectKey}`,
    Key: newObjectKey
  }).promise();
  await s3.deleteObject({
    ...defaultOptions,
    Key: oldObjectKey
  }).promise();
}
