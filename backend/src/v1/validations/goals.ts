import Joi from 'joi';

export const createGoalBodySchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  to_be_completed_date: Joi.date()
    .when('status', { is: 'pending', then: Joi.required(), otherwise: Joi.allow('') }),
  completion_date: Joi.date()
    .when('status', { is: 'completed', then: Joi.required(), otherwise: Joi.allow('') }),
  status: Joi.string().allow('submitted', 'pending', 'completed')
}).min(2).max(5);

export const updateGoalBodySchema: Joi.ObjectSchema = Joi.object({
  goal_id: Joi.forbidden(),
  title: Joi.string(),
  summary: Joi.string(),
  to_be_completed_date: Joi.date(),
  completed_date: Joi.date(),
  status: Joi.string().allow('submitted', 'pending', 'completed')
}).min(1).max(5);