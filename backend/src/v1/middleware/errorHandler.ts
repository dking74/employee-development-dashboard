import express, { ErrorRequestHandler } from 'express';
import { InternalError } from '@http-errors';

export default (err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('Here is error: ', err);
  res.status(500).json(new InternalError(err.toString()));
}