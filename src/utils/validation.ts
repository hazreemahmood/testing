import Joi from 'joi';

const itemValidationSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().positive().required(),
});

export const validateItem = (item: any) => {
  return itemValidationSchema.validate(item);
};