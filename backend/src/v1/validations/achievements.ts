import Joi from 'joi';

export const createAchievementSchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
  completed_date: Joi.date().default(new Date()),
  other_comments: Joi.string().optional().allow(''),
  attachment_url: Joi.string().optional().pattern(/^http/)
}).min(2).max(5);

export const updateAchievementSchema: Joi.ObjectSchema = Joi.object({
  user_id: Joi.forbidden(),
  title: Joi.string().optional(),
  summary: Joi.string().optional(),
  completed_date: Joi.date().optional().allow(''),
  other_comments: Joi.string().optional().allow(''),
  attachment_url: Joi.string().optional().pattern(/^http/).allow('')
}).min(1);