import express from 'express';

import { isEventExist } from '@v1/services/events';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const eventId = req.params.eventId;
    const doesEventExist = await isEventExist(eventId);
    if (!doesEventExist) {
      throw new BadRequestError(`The eventId in request params does not match any event: "${eventId}"`);
    }

    return next();
  })(req, res, next);
};