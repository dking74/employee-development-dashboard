import { query } from '@utils/database.util';
import { constuctFilteredQuery, PostgresQuery } from '@utils/query.util';
import { QueryParameters } from '@types';

export const getAllUsers = async (queryParams: QueryParameters) => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getUser = async (userId: string) => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), { query: 'username = $1 OR email = $1', parameters: [userId] });
  return await query(_query.query, _query.parameters);
}

export default {
  getAllUsers,
  getUser,
}