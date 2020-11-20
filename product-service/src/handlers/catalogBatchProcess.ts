import 'source-map-support/register';
import { processError, processResponse } from '../utils/response.helper';
import * as productService from '../services/product/product.service';
import { SQSEvent } from 'aws-lambda';
import { ProductToSave, SQSProduct } from '../types';
import { publish } from '../services/sns';

export default async (event: SQSEvent) => {
  const mappedProducts: ProductToSave[] = event.Records
    .map(record => {
      const item: SQSProduct = JSON.parse(record.body);
      return {
        description: item.description,
        title: item.title,
        count: +item.count,
        price: +item.price,
      };
    });
  const createdProducts = await Promise.all(mappedProducts.map(async (product) => {
    try {
      return await productService.createProduct(product);
    } catch (err) {
      console.error(`Error during saving product: [${product}]: `, err);
      return null;
    }
  }))

  await publish(`Products were parsed. Result: ${JSON.stringify(createdProducts)}`);

  try {
    return processResponse(createdProducts.map(product => product));
  } catch (err) {
    return processError(err);
  }
}

