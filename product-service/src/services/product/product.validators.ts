import * as Joi from '@hapi/joi';
import { Product } from '../../types';
import { ValidationError } from '../../exceptions';

const productSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().integer().min(0).required(),
  count: Joi.number().integer().min(1).required()
});

export function validateProduct(product: Product) {
  const { error, value } = productSchema.validate(product);
  if (error) {
    throw new ValidationError(error.message);
  }

  return value;
}
