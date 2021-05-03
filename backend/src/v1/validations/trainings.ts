import Joi from 'joi';

import { trainingCategories } from '@constants';

export const createTrainingBodySchema: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required().pattern(/^http/),
  keywords: Joi.array().min(1),
  category: Joi.array().allow(...trainingCategories),
  views: Joi.forbidden(),
  rating: Joi.forbidden(),
  num_ratings: Joi.forbidden(),
  total_ratings_score: Joi.forbidden()
}).min(1).max(4);
  
export const updateTrainingBodySchema: Joi.ObjectSchema = Joi.object({
  training_id: Joi.forbidden(),
  title: Joi.forbidden(),
  url: Joi.string().pattern(/^http/),
  keywords: Joi.array().min(1),
  category: Joi.array().allow(...trainingCategories),
  summary: Joi.string(),
  views: Joi.number().min(0),
  rating: Joi.number().min(0).max(5),
  num_ratings: Joi.number().min(0),
  total_ratings_score: Joi.number().min(0)
}).min(1).max(8);

export const updateTrainingRatingBodySchema: Joi.ObjectSchema = Joi.object(({
  rating: Joi.number().required()
}));