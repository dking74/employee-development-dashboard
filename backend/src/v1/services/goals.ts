import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Goal, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllGoals = async (queryParams: QueryParameters): Promise<Goal[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('Goal'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getGoal = async (goalId: string): Promise<Goal> => {
  const _query = constuctFilteredQuery(PostgresQuery('Goal'), constructUniqueQueryParameters({ goal_id: parseInt(goalId) }));
  const goal = await query(_query.query, _query.parameters);
  if (goal.length === 0) {
    throw new BadRequestError(`Could not find the goal with goalId: '${goalId}'`);
  }

  return goal[0];
};

export const isGoalExist = async (goalId: string) => {
  return await getGoal(goalId).then(data => true).catch(error => false);
}

export const createGoal = async (goal: Goal): Promise<Goal | null> => {
  const _query = constructInsertQuery<Goal>('Goal', goal);
  const goalCreated = await query(_query.query, _query.parameters);
  if (goalCreated.length === 0) {
    throw new InternalError('Unable to create the new goal');
  }

  return goalCreated[0];
};

export const updateGoal = async (goalId: string, goal: Goal): Promise<Goal> => {
  const goalIdentifier = filterKeyIdentifier({ goal_id: parseInt(goalId) });
  const _query = constructUpdateQuery('Goal', goalIdentifier, goal);
  const goalUpdated = await query(_query.query, _query.parameters);
  if (goalUpdated.length === 0) {
    throw new InternalError('Unable to update the goal');
  }

  return goalUpdated[0];
};

export const deleteGoal = async (goalId: string) => {
  const goalIdentifier = filterKeyIdentifier({ goal_id: parseInt(goalId) });
  const _query = constructDeleteQuery('Goal', goalIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  getAllGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
}