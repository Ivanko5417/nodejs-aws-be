import { S3CreateEvent } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import { getReadableStream } from '../services/s3';
import { parseFile } from '../services/fileParser';

export default async (event: S3CreateEvent) => {
  try {
    await parseFile(getReadableStream(event.Records[0].s3.object.key));

    return processResponse({ ok: true });
  } catch (err) {
    return processError(err);
  }
}
