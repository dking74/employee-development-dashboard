import express from 'express';

import { isUserExist } from '@v1/services/users';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const userId = req.params.userId;
    const doesUserExist = await isUserExist(userId);
    if (!doesUserExist) {
      throw new BadRequestError(`The userId in request params does not match any user: "${userId}"`);
    }

    return next();
  })(req, res, next);
};