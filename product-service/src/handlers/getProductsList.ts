import 'source-map-support/register';
import { getProducts } from '../services/product';
import { processError, processResponse } from '../utils/response.helper';

export default async () => {
  try {
    return processResponse(getProducts());
  } catch (err) {
    return processError(err);
  }
}

