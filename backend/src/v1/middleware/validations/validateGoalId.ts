import express from 'express';

import { isGoalExist } from '@v1/services/goals';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const goalId = req.params.goalId;
    const doesGoalExist = await isGoalExist(goalId);
    if (!doesGoalExist) {
      throw new BadRequestError(`The goalId in request params does not match any goal: "${goalId}"`);
    }

    return next();
  })(req, res, next);
};