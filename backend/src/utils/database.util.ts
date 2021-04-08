import { Client } from 'pg';
import { to } from 'await-to-js';

import config from '../config';
import { InternalError } from '../errors';

const client = new Client(config()?.database);

export const query = async (query: string, parameters: Array<string> = []) => {
  await client.connect();
  const [error, result] = await to(client.query(query, parameters));
  await client.end();

  if (error) throw new InternalError(error.message, error.stack);
  return result?.rows;
}

export default client;