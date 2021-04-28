import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Training, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllTrainings = async (queryParams: QueryParameters): Promise<Training[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('Training'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getTraining = async (trainingId: string): Promise<Training> => {
  const _query = constuctFilteredQuery(PostgresQuery('Training'), constructUniqueQueryParameters({ training_id: parseInt(trainingId) }));
  const training = await query(_query.query, _query.parameters);
  if (training.length === 0) {
    throw new BadRequestError(`Could not find the training with trainingId: '${trainingId}'`);
  }

  return training[0];
};

export const isTrainingExist = async (trainingId: string) => {
  return await getTraining(trainingId).then(data => true).catch(error => false);
}

export const createTraining = async (training: Training): Promise<Training | null> => {
  const _query = constructInsertQuery<Training>('Training', training);
  const trainingCreated = await query(_query.query, _query.parameters);
  if (trainingCreated.length === 0) {
    throw new InternalError('Unable to create the new training');
  }

  return trainingCreated[0];
};

export const updateTraining = async (trainingId: string, training: Training): Promise<Training> => {
  const trainingIdentifier = filterKeyIdentifier({ training_id: parseInt(trainingId) });
  const _query = constructUpdateQuery('Training', trainingIdentifier, training);
  const trainingUpdated = await query(_query.query, _query.parameters);
  if (trainingUpdated.length === 0) {
    throw new InternalError('Unable to update the training');
  }

  return trainingUpdated[0];
};

export const deleteTraining = async (trainingId: string) => {
  const trainingIdentifier = filterKeyIdentifier({ training_id: parseInt(trainingId) });
  const _query = constructDeleteQuery('Training', trainingIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  getAllTrainings,
  getTraining,
  createTraining,
  updateTraining,
  deleteTraining,
}