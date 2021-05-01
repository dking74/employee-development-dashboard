import Joi from 'joi';

import { userTrainingStatus } from '@constants';

export const createUserTrainingSchema: Joi.ObjectSchema = Joi.object({
  status: Joi.string().required().allow(...userTrainingStatus)
}).min(1).max(1);

export const updateUserTrainingSchema: Joi.ObjectSchema = Joi.object({
  user_event_id: Joi.forbidden(),
  status: Joi.string().required().allow(...userTrainingStatus)
}).min(1);