import 'source-map-support/register';
import { getProducts } from '../services/db/product';
import { processError, processResponse } from '../utils/response.helper';

export default async () => {
  try {
    return processResponse(await getProducts());
  } catch (err) {
    return processError(err);
  }
}

