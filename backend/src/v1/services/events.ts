import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Event, QueryParameters} from '@types';
import { BadRequestError, InternalError } from '@http-errors';

export const getAllEvents = async (queryParams: QueryParameters): Promise<Event[]> => {
  const _query = constuctFilteredQuery(PostgresQuery('Event'), queryParams);
  return await query(_query.query, _query.parameters);
};

export const getEvent = async (eventId: string): Promise<Event> => {
  const _query = constuctFilteredQuery(PostgresQuery('Event'), constructUniqueQueryParameters({ event_id: parseInt(eventId), title: eventId }));
  const event = await query(_query.query, _query.parameters);
  if (event.length === 0) {
    throw new BadRequestError(`Could not find the event with eventId: '${eventId}'`);
  }

  return event[0];
};

export const isEventExist = async (eventId: string) => {
  return await getEvent(eventId).then(data => true).catch(error => false);
}

export const createEvent = async (event: Event): Promise<Event | null> => {
  const _query = constructInsertQuery<Event>('Event', event);
  const eventCreated = await query(_query.query, _query.parameters);
  if (eventCreated.length === 0) {
    throw new InternalError('Unable to create the new event');
  }

  return eventCreated[0];
};

export const updateEvent = async (eventId: string, event: Event): Promise<Event> => {
  const eventIdentifier = filterKeyIdentifier({ event_id: parseInt(eventId), title: eventId });
  const _query = constructUpdateQuery('Event', eventIdentifier, event);
  const eventUpdated = await query(_query.query, _query.parameters);
  if (eventUpdated.length === 0) {
    throw new InternalError('Unable to update the event');
  }

  return eventUpdated[0];
};

export const deleteEvent = async (eventId: string) => {
  const eventIdentifier = filterKeyIdentifier({ event_id: parseInt(eventId), title: eventId });
  const _query = constructDeleteQuery('Event', eventIdentifier);
  return await query(_query.query, _query.parameters);
};

export default {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
}