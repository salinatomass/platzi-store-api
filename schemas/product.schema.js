const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(1);
const description = Joi.string().min(10).max(300);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer().min(1);
const offset = Joi.number().integer().min(0);

const getProductSchema = Joi.object({ id: id.required() });

const queryProductSchema = Joi.object({ limit, offset });

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId,
});

module.exports = {
  getProductSchema,
  queryProductSchema,
  createProductSchema,
  updateProductSchema,
};
