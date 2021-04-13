import express from 'express';
import { ObjectSchema } from 'joi';

import { BadRequestError } from '@http-errors';
import { createUserBodySchema, updateUserBodySchema } from './users';


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

export { createUserBodySchema, updateUserBodySchema };

export default validateBody;