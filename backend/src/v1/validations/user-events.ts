import Joi from 'joi';

import { userEventStatus } from '@constants';

export const createUserEventSchema: Joi.ObjectSchema = Joi.object({
  status: Joi.string().required().allow(...userEventStatus)
}).min(1).max(1);

export const updateUserEventSchema: Joi.ObjectSchema = Joi.object({
  user_event_id: Joi.forbidden(),
  eventId: Joi.forbidden(),
  status: Joi.string().required().allow(...userEventStatus)
}).min(1);