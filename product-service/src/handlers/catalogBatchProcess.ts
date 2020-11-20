import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import { SQSEvent } from 'aws-lambda';

export default async (event: SQSEvent) => {
  console.log(event)
  try {
    return processResponse({});
  } catch (err) {
    return processError(err);
  }
}

