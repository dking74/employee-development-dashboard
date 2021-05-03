import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Training, QueryParameters } from '@types';
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
  const _query = constructInsertQuery<Training>('Training', { ...training, views: 0, rating: 0, num_ratings: 0, total_ratings_score: 0 });
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

export const updateTrainingRating = async (trainingId: string, rating: number): Promise<Training> => {
  const { num_ratings, total_ratings_score } = await getTraining(trainingId);
  const newNumRatings = num_ratings + 1;
  const newTotalRatings = total_ratings_score + rating;
  const newRating = newTotalRatings / newNumRatings;

  const trainingIdentifier = filterKeyIdentifier({ training_id: parseInt(trainingId) });
  const _query = constructUpdateQuery('Training', trainingIdentifier,
    { rating: newRating, num_ratings: newNumRatings, total_ratings_score: newTotalRatings }
  );
  const trainingUpdated = await query(_query.query, _query.parameters);
  if (trainingUpdated.length === 0) {
    throw new InternalError('Unable to update the training rating');
  }

  return trainingUpdated[0];
};

export const updateTrainingViews = async (trainingId: string): Promise<Training> => {
  const { views } = await getTraining(trainingId);
  const trainingIdentifier = filterKeyIdentifier({ training_id: parseInt(trainingId) });
  const _query = constructUpdateQuery('Training', trainingIdentifier, { views: views + 1 });
  const trainingUpdated = await query(_query.query, _query.parameters);
  if (trainingUpdated.length === 0) {
    throw new InternalError('Unable to update the training views');
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
  updateTrainingRating,
  updateTrainingViews,
  deleteTraining,
}