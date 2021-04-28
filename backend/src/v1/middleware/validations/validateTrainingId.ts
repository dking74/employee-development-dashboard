import express from 'express';

import { isTrainingExist } from '@v1/services/trainings';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const trainingId = req.params.trainingId;
    const doesTrainingExist = await isTrainingExist(trainingId);
    if (!doesTrainingExist) {
      throw new BadRequestError(`The trainingId in request params does not match any training video: "${trainingId}"`);
    }

    return next();
  })(req, res, next);
};