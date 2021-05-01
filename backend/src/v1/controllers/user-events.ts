import express from 'express';

import userEventServices from '@v1/services/user-events';
import { addEventNumRegistered, subtractEventNumRegistered } from '@v1/services/events';
import { UserEvent } from '@types';

export const getAllUserEvents = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const userEvents = await userEventServices.getAllUserEvents(_queryParams);
  res.status(200).json(userEvents);
};

export const getUserEvent = async (req: express.Request, res: express.Response) => {
  const eventId = req.params.eventId;
  const event = await userEventServices.getUserEvent(req.params.userId, eventId);
  res.status(200).json(event);
};

export const createUserEvent = async (req: express.Request, res: express.Response) => {
  const userEvent: UserEvent & { user_id: string, event_id: string } = req.requestBody;
  await updateUserEventRegistered(userEvent.event_id, userEvent);
  const userEventCreated = await userEventServices.createUserEvent(userEvent);
  res.status(201).json(userEventCreated);
};

export const updateUserEvent = async (req: express.Request, res: express.Response) => {
  const eventId: string = req.params.eventId;
  const userEventUpdateParams: UserEvent = req.body;
  await updateUserEventRegistered(req.params.eventId, userEventUpdateParams);
  const userEventUpdated = await userEventServices.updateUserEvent(req.params.userId, eventId, userEventUpdateParams);
  res.status(200).json(userEventUpdated);
};

export const deleteUserEvent = async (req: express.Request, res: express.Response) => {
  const eventId: string = req.params.eventId;
  await userEventServices.deleteUserEvent(req.params.userId, eventId);
  res.status(204).json();
};

const updateUserEventRegistered = async (eventId: string, event: UserEvent) => {
  if (!event.status) return;
  if (event.status === 'registered') await addEventNumRegistered(eventId);
  else if (event.status === 'deactive') await subtractEventNumRegistered(eventId);
}

export default {
  getAllUserEvents,
  getUserEvent,
  createUserEvent,
  updateUserEvent,
  deleteUserEvent
}