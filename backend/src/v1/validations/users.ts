import Joi from 'joi';

export const createUserBodySchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().min(6).max(15),
  email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().min(7).max(10).default('')
}).min(4).max(5);

export const updateUserBodySchema: Joi.ObjectSchema = Joi.object({
  username: Joi.forbidden(),
  email: Joi.forbidden(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone: Joi.string().min(7).max(10).optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  score: Joi.number().min(0).optional()
}).min(1);