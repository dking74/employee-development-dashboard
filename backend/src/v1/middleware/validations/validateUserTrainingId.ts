import express from 'express';

import { isUserTrainingExist } from '@v1/services/user-trainings';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const userId = req.params.userId;
    const trainingId = req.params.trainingId;
    const doesUserTrainingExist = await isUserTrainingExist(userId, trainingId);
    if (!doesUserTrainingExist) {
      throw new BadRequestError(`The userId/trainingId in request params does not match any user: "${userId}/${trainingId}"`);
    }

    return next();
  })(req, res, next);
};