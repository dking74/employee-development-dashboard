import Joi from 'joi';

export const createCertificationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required().allow(''),
  attachment_url: Joi.string().optional().pattern(/^http/).default('')
}).min(1).max(3);

export const updateCertificationSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(''),
  attachment_url: Joi.string().optional().pattern(/^http/)
}).min(1);