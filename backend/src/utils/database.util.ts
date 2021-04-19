import { Pool, QueryResult } from 'pg';
import { to } from 'await-to-js';

import config from '../config';
import { InternalError } from '../errors';

const pool = new Pool(config()?.database);

/**
 * Query
 * 
 * @param query 
 * @param parameters 
 * @returns 
 */
export const query = async (query: string, parameters: Array<string | number> = []): Promise<QueryResult<any> | any> => {
  return pool.connect()
    .then(async client => {
      const [error, result] = await to(client.query(query, parameters));
      client.release();

      if (error) throw new InternalError(error.message, error.stack);
      return result?.rows;
    });
}

export default pool;