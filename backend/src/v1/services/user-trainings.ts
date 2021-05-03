import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { UserTraining, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllUserTrainings = async (queryParams: QueryParameters): Promise<UserTraining[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('UserTraining', {
    joinTable: 'Training',
    joinProp: 'training_id'
  }), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getUserTraining = async (userId: string, trainingId: string): Promise<UserTraining> => {
  const _query = constuctFilteredQuery(PostgresQuery('UserTraining'), constructUniqueQueryParameters({ user_id: parseInt(userId), training_id: parseInt(trainingId) }));
  const userTraining = await query(_query.query, _query.parameters);
  if (userTraining.length === 0) {
    throw new BadRequestError(`Could not find the userTraining with userId: '${userId}' and trainingId: '${trainingId}'`);
  }

  return userTraining[0];
};

export const isUserTrainingExist = async (userId: string, trainingId: string) => {
  return await getUserTraining(userId, trainingId).then(data => true).catch(error => false);
}

export const createUserTraining = async (userTraining: UserTraining): Promise<UserTraining | null> => {
  const _query = constructInsertQuery<UserTraining>('UserTraining', userTraining);
  const userTrainingCreated = await query(_query.query, _query.parameters);
  if (userTrainingCreated.length === 0) {
    throw new InternalError('Unable to create the new userTraining');
  }

  return userTrainingCreated[0];
};

export const updateUserTraining = async (userId: string, TrainingId: string, userTraining: UserTraining): Promise<UserTraining> => {
  const userTrainingIdentifier = filterKeyIdentifier({ user_id: parseInt(userId), Training_id: parseInt(TrainingId) });
  const _query = constructUpdateQuery('UserTraining', userTrainingIdentifier, userTraining);
  const userTrainingUpdated = await query(_query.query, _query.parameters);
  if (userTrainingUpdated.length === 0) {
    throw new InternalError('Unable to update the userTraining');
  }

  return userTrainingUpdated[0];
};

export const deleteUserTraining = async (userId: string, TrainingId: string) => {
  const userTrainingIdentifier = filterKeyIdentifier({ user_id: parseInt(userId), Training_id: parseInt(TrainingId) });
  const _query = constructDeleteQuery('UserTraining', userTrainingIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  isUserTrainingExist,
  getAllUserTrainings,
  getUserTraining,
  createUserTraining,
  updateUserTraining,
  deleteUserTraining,
}