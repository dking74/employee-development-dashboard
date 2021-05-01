import express from 'express';

import logger from '../../logger';
import config from '../../config';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info(`Request being made to: ${req.method} ${req.path}`);
  logger.info(`Here is the config: ${config}`);
  return next();
};