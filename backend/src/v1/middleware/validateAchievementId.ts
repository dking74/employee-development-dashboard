import express from 'express';

import { isAchievementExist } from '../services/achievements';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const achievementId = req.params.achievementId;
    const doesUserExist = await isAchievementExist(achievementId);
    if (!doesUserExist) {
      throw new BadRequestError(`The achievementId in request params does not match any current achievement: "${achievementId}"`);
    }

    return next();
  })(req, res, next);
};