import express, { ErrorRequestHandler } from 'express';

export default (err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // @ts-ignore
  const code = err.code || 500;
  // @ts-ignore
  const message = err.message || 'Unknown application error occurred';
  // @ts-ignore
  const details = err.details || '';
  res.status(code).json({
    code,
    message,
    details
  });
}