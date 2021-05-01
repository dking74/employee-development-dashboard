import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { UserEvent, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllUserEvents = async (queryParams: QueryParameters): Promise<UserEvent[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('UserEvent'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getUserEvent = async (userId: string, eventId: string): Promise<UserEvent> => {
  const _query = constuctFilteredQuery(PostgresQuery('UserEvent'), constructUniqueQueryParameters({ user_id: parseInt(userId), event_id: parseInt(eventId) }));
  const userEvent = await query(_query.query, _query.parameters);
  if (userEvent.length === 0) {
    throw new BadRequestError(`Could not find the userEvent with userId: '${userId}' and eventId: '${eventId}'`);
  }

  return userEvent[0];
};

export const isUserEventExist = async (userId: string, eventId: string) => {
  return await getUserEvent(userId, eventId).then(data => true).catch(error => false);
}

export const createUserEvent = async (userEvent: UserEvent): Promise<UserEvent | null> => {
  const _query = constructInsertQuery<UserEvent>('UserEvent', userEvent);
  const userEventCreated = await query(_query.query, _query.parameters);
  if (userEventCreated.length === 0) {
    throw new InternalError('Unable to create the new userEvent');
  }

  return userEventCreated[0];
};

export const updateUserEvent = async (userId: string, eventId: string, userEvent: UserEvent): Promise<UserEvent> => {
  const userEventIdentifier = filterKeyIdentifier({ user_id: parseInt(userId), event_id: parseInt(eventId) });
  const _query = constructUpdateQuery('UserEvent', userEventIdentifier, userEvent);
  const userEventUpdated = await query(_query.query, _query.parameters);
  if (userEventUpdated.length === 0) {
    throw new InternalError('Unable to update the userEvent');
  }

  return userEventUpdated[0];
};

export const deleteUserEvent = async (userId: string, eventId: string) => {
  const userEventIdentifier = filterKeyIdentifier({ user_id: parseInt(userId), event_id: parseInt(eventId) });
  const _query = constructDeleteQuery('UserEvent', userEventIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  isUserEventExist,
  getAllUserEvents,
  getUserEvent,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent,
}