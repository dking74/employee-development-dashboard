import { query } from '@utils/database.util';
import { constructDeleteQuery, constructInsertQuery, constructUniqueQueryParameters, constructUpdateQuery, constuctFilteredQuery, filterKeyIdentifier, PostgresQuery } from '@utils/query.util';
import { Event, UpdateEventRequest, QueryParameters } from '@types';
import { BadRequestError, InternalError, NotFoundError } from '@http-errors';
import { isNull } from 'lodash';

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
  const eventObject: Event = { ...event, status: 'open', num_registered: 0, location: event.location || 'No location provided', organizers: event.organizers || [] };
  const _query = constructInsertQuery<Event>('Event', eventObject);
  const eventCreated = await query(_query.query, _query.parameters);
  if (eventCreated.length === 0) {
    throw new InternalError('Unable to create the new event');
  }

  return eventCreated[0];
};

export const updateEvent = async (eventId: string, event: UpdateEventRequest): Promise<Event> => {
  const eventIdentifier = filterKeyIdentifier({ event_id: parseInt(eventId), title: eventId });
  const _query = constructUpdateQuery('Event', eventIdentifier, event);
  const eventUpdated = await query(_query.query, _query.parameters);
  if (eventUpdated.length === 0) {
    throw new InternalError('Unable to update the event');
  }

  return eventUpdated[0];
};

const adjustEventNumRegistered = async (eventId: string, adjustment: number, checkFunc: (reg: number, cap: number) => boolean): Promise<Event | null> => {
  const currentEvent: Event = await getEvent(eventId);
  const currentNumRegistered = currentEvent.num_registered;
  const currentCapacity = currentEvent.capacity;
  if (checkFunc(currentNumRegistered, currentCapacity)) {
    const newNumRegistered = currentNumRegistered + adjustment;
    const event = await updateEvent(eventId, { num_registered: newNumRegistered });
    return event;
  }

  return null;
}

export const addEventNumRegistered = async (eventId: string): Promise<Event | null> => {
  const adjusted = await adjustEventNumRegistered(eventId, 1, (num1, num2) => num1 < num2);
  if (isNull(adjusted)) {
    throw new NotFoundError('There are already the maximum number of people registerd for the event');
  }

  return adjusted;
};

export const subtractEventNumRegistered = async (eventId: string): Promise<Event | null> => {
  return await adjustEventNumRegistered(eventId, -1, (num1, num2) => num1 <= num2 && num1 >= 1);
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