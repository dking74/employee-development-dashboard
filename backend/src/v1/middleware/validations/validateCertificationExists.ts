import express from 'express';

import { isCertificationExist } from '@v1/services/certifications';
import { BadRequestError } from '@http-errors';
import asyncWrapper from '@utils/service.util';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return asyncWrapper(async () => {
    const certificationId = req.params.certificationId;
    const doesUserExist = await isCertificationExist(certificationId);
    if (!doesUserExist) {
      throw new BadRequestError(`The certificationId in request params does not match any current certification: "${certificationId}"`);
    }

    return next();
  })(req, res, next);
};