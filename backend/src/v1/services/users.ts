import { query } from '@utils/database.util';
import { constructInsertQuery, constuctFilteredQuery, PostgresInsert, PostgresQuery } from '@utils/query.util';
import { CreateUserRequest, QueryParameters, User } from '@types';

export const getAllUsers = async (queryParams: QueryParameters) => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getUser = async (userId: string) => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), { query: 'username = $1 OR email = $1', parameters: [userId] });
  return await query(_query.query, _query.parameters);
};

export const createUser = async (user: CreateUserRequest): Promise<User | null> => {
  const userObject: User = { ...user, status: "active", score: 0 };
  const _query = constructInsertQuery<User>('User', userObject);
  const userResult = await query(_query.query, _query.parameters);
  console.log('Here is result of insert: ', userResult);

  return null;
};

export default {
  getAllUsers,
  getUser,
  createUser,
}