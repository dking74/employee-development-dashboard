import express from 'express';

type ExpressController = (req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<any>;
export const asyncWrapper = (controller: ExpressController) =>
  (req: express.Request, res: express.Response, next?: express.NextFunction) =>
    Promise.resolve(controller(req, res, next))
      .catch(error => next && next(error));

export default asyncWrapper;