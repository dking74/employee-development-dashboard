import Joi from 'joi';

export const createGoalBodySchema: Joi.ObjectSchema = Joi.object({
  summary: Joi.string().required(),
  to_be_completed_date: Joi.date().required(),
  completed_date: Joi.date(),
  status: Joi.string().allow('submitted', 'pending', 'completed')
}).min(2).max(4);

export const updateGoalBodySchema: Joi.ObjectSchema = Joi.object({
  goal_id: Joi.forbidden(),
  summary: Joi.string(),
  to_be_completed_date: Joi.date(),
  completed_date: Joi.date(),
  status: Joi.string().allow('submitted', 'pending', 'completed')
}).min(1).max(4);