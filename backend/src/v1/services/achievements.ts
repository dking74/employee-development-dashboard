import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Achievement, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllAchievements = async (queryParams: QueryParameters): Promise<Achievement[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('Achievement'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getAchievement = async (achievementId: string): Promise<Achievement> => {
  const _query = constuctFilteredQuery(PostgresQuery('Achievement'), constructUniqueQueryParameters({ achievement_id: parseInt(achievementId), title: achievementId }));
  const user = await query(_query.query, _query.parameters);
  if (user.length === 0) {
    throw new BadRequestError(`Could not find the achievement with achievementId: '${achievementId}'`);
  }

  return user[0];
};

export const isAchievementExist = async (achievementId: string) => {
  return await getAchievement(achievementId).then(data => true).catch(error => false);
}

export const createAchievement = async (achievement: Achievement): Promise<Achievement | null> => {
  const _query = constructInsertQuery<Achievement>('Achievement', achievement);
  const achievementCreated = await query(_query.query, _query.parameters);
  if (achievementCreated.length === 0) {
    throw new InternalError('Unable to create the new achievement');
  }

  return achievementCreated[0];
};

export const updateAchievement = async (achievementId: string, achievement: Achievement): Promise<Achievement> => {
  const achievementIdentifier = filterKeyIdentifier({ achievement_id: parseInt(achievementId), title: achievementId });
  const _query = constructUpdateQuery('Achievement', achievementIdentifier, achievement);
  const userUpdated = await query(_query.query, _query.parameters);
  if (userUpdated.length === 0) {
    throw new InternalError('Unable to update the achievement');
  }

  return userUpdated[0];
};

export const deleteAchievement = async (achievementId: string) => {
  const achievementIdentifier = filterKeyIdentifier({ achievement_id: parseInt(achievementId), title: achievementId });
  const _query = constructDeleteQuery('Achievement', achievementIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  getAllAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
}