import express from 'express';
import { ObjectSchema } from 'joi';

import { BadRequestError } from '@http-errors';
import { createUserBodySchema, updateUserBodySchema } from './users';
import { createAchievementSchema, updateAchievementSchema } from './achievements';
import { createCertificationSchema, updateCertificationSchema } from './certifications';

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
};

export default validateBody;