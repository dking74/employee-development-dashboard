import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, PostgresQuery } from '@utils/query.util';
import { CreateUserRequest, QueryParameters, UpdateUserRequest, User } from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllUsers = async (queryParams: QueryParameters): Promise<User[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getUser = async (userId: string): Promise<User> => {
  const _query = constuctFilteredQuery(PostgresQuery('User'), constructUniqueQueryParameters({ user_id: parseInt(userId), username: userId, email: userId})); 
  const user = await query(_query.query, _query.parameters);
  if (user.length === 0) {
    throw new BadRequestError(`Could not find the user with userId: '${userId}'`);
  }

  return user[0];
};

export const isUserExist = async (userId: string) => {
  return await getUser(userId).then(data => true).catch(error => false);
}

export const validateUserExists = async (userId: string) => {
  // Make sure that the email does not exist before trying to create
  const isUserFound = await isUserExist(userId);
  if (isUserFound) {
    throw new BadRequestError('The user attempting to create already exists');
  }
}

export const createUser = async (user: CreateUserRequest): Promise<User | null> => {
  await validateUserExists(user.username);

  const userObject: User = { ...user, status: "active", score: 0 };
  const _query = constructInsertQuery<User>('User', userObject);
  const userCreated = await query(_query.query, _query.parameters);
  if (userCreated.length === 0) {
    throw new InternalError('Unable to create the new user');
  }

  return userCreated[0];
};

export const updateUser = async (userId: string, user: UpdateUserRequest): Promise<User> => {
  const _query = constructUpdateQuery('User', { username: userId, email: userId }, user);
  const userUpdated = await query(_query.query, _query.parameters);
  if (userUpdated.length === 0) {
    throw new InternalError('Unable to update the user');
  }

  return userUpdated[0];
};

export const deleteUser = async (userId: string) => {
  const _query = constructDeleteQuery('User', { username: userId, email: userId });
  return await query(_query.query, _query.parameters);
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}