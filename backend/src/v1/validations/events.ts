import Joi from 'joi';

import { eventStatus } from '@constants';

export const createEventBodySchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  organizers: Joi.array().min(1),
  num_registered: Joi.number().min(0).default(0),
  capacity: Joi.number().min(0).default(0),
  date: Joi.date().required(),
  location: Joi.string()
}).min(1).max(7);
  
export const updateEventBodySchema: Joi.ObjectSchema = Joi.object({
  event_id: Joi.forbidden(),
  title: Joi.forbidden(),
  summary: Joi.string(),
  organizers: Joi.array().min(1),
  num_registered: Joi.number().min(0),
  capacity: Joi.number().positive(),
  date: Joi.date(),
  location: Joi.string().default('No location provided'),
  status: Joi.string().allow(...eventStatus)
}).min(1).max(7);