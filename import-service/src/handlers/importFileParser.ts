import { S3CreateEvent } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import { getReadableStream, moveObject } from '../services/s3';
import { parseFile } from '../services/fileParser';
import { S3_PARSED_FOLDER } from '../constants';

export default async (event: S3CreateEvent) => {
  try {
    await Promise.all(event.Records.map(async (record) => {
      const { object: { key } } = record.s3;
      await parseFile(getReadableStream(key));
      await moveObject(key, S3_PARSED_FOLDER);
    }))

    return processResponse({ ok: true });
  } catch (err) {
    return processError(err);
  }
}
