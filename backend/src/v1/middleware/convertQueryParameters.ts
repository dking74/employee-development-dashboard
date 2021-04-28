import express from 'express';
import { getQueryParameters } from '@utils/query.util';
import { QueryObject } from '../../types';

export default <T extends QueryObject>(validKeys: Array<string>, keySignMapping: { [key: string]: string } = {}) => {
  return (req: express.Request<T>, res: express.Response, next: express.NextFunction) => {
    const _query = ((req.query as any) as T);
    const _queryParams = getQueryParameters<T>(_query, validKeys, keySignMapping);
    req.queryParameters = _queryParams;

    return next();
  }
}