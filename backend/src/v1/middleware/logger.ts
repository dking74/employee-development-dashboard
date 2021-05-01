import express from 'express';

import logger from '../../logger';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.debug(`Request being made to: ${req.method} ${req.path}`);
  return next();
};