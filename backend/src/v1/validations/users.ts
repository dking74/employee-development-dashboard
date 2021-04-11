import Joi from 'joi';

export const createUserBodySchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().min(6).max(15),
  email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().min(7).max(10)
});