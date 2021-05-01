import express from 'express';
import { ObjectSchema } from 'joi';

import { BadRequestError } from '@http-errors';
import { createUserBodySchema, updateUserBodySchema } from './users';
import { createAchievementSchema, updateAchievementSchema } from './achievements';
import { createCertificationSchema, updateCertificationSchema } from './certifications';
import { createGoalBodySchema, updateGoalBodySchema } from './goals';
import { createEventBodySchema, updateEventBodySchema } from './events'; 
import { createTrainingBodySchema, updateTrainingBodySchema } from './trainings';
import { createUserEventSchema, updateUserEventSchema } from './user-events';
import { createUserTrainingSchema, updateUserTrainingSchema } from './user-trainings';

export const validateBody = (schema: ObjectSchema) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = schema.validate(req.body);
    if (result.warning || result.error) {
      throw new BadRequestError(
        `Unable to validate the request body. Additional details: ${result.warning || result.error}`
      );
    }

    return next();
  }
};

export {
  // User Schemas
  createUserBodySchema,
  updateUserBodySchema,

  // Achievement Schemas
  createAchievementSchema,
  updateAchievementSchema,

  // Certification Schemas
  createCertificationSchema,
  updateCertificationSchema,

  // Goal Schemas
  createGoalBodySchema,
  updateGoalBodySchema,

  // Event Schemas
  createEventBodySchema,
  updateEventBodySchema,

  // Training Schemas
  createTrainingBodySchema,
  updateTrainingBodySchema,

  // UserEvent Schemas
  createUserEventSchema,
  updateUserEventSchema,

  // UserTraining Schemas
  createUserTrainingSchema,
  updateUserTrainingSchema,
};

export default validateBody;