import Joi from 'joi';

export const createEventBodySchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  organizers: Joi.array().min(1),
  num_registered: Joi.number().min(0).default(0),
  capacity: Joi.number().min(0),
  location: Joi.string()
}).min(1).max(6);
  
export const updateEventBodySchema: Joi.ObjectSchema = Joi.object({
  event_id: Joi.forbidden(),
  title: Joi.forbidden(),
  summary: Joi.string(),
  organizers: Joi.array().min(1),
  num_registered: Joi.number().min(0),
  capacity: Joi.number().positive(),
  location: Joi.string()
}).min(1).max(4);