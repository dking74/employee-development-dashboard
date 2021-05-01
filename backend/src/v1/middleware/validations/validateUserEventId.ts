import express from 'express';

import { isUserEventExist } from '@v1/services/user-events';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const userId = req.params.userId;
    const eventId = req.params.eventId
    const doesUserEventExist = await isUserEventExist(userId, eventId);
    if (!doesUserEventExist) {
      throw new BadRequestError(`The userId/eventId in request params does not match any user: "${userId}/${eventId}"`);
    }

    return next();
  })(req, res, next);
};