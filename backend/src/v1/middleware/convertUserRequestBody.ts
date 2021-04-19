import express from 'express';

import { getUser } from '../services/users';
import { BadRequestError } from '@http-errors';
import { User } from '@types';
import asyncWrapper from '@utils/service.util';

export default <T>(req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const userId = req.params.userId;
    if (!userId) {
      throw new BadRequestError(`'user_id' field must be included in request path.`);
    }
  
    const user: User = await getUser(userId);
    if (!user.user_id) {
      throw new BadRequestError(`Unable to get information for user: '${userId}'.`);
    }
    const reqBody = {
      ...req.body,
      user_id: user.user_id
    };
    req.requestBody = ((reqBody as any) as T);
  
    return next();
  })(req, res, next);
};