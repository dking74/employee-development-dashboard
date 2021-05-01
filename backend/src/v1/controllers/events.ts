import express from 'express';

import eventServices from '@v1/services/events';
import { Event } from '@types';

export const getAllEvents = async (req: express.Request, res: express.Response) => {
  const _queryParams = req.queryParameters;
  const events = await eventServices.getAllEvents(_queryParams);
  res.status(200).json(events);
};

export const getEvent = async (req: express.Request, res: express.Response) => {
  const eventId = req.params.eventId;
  const event = await eventServices.getEvent(eventId);
  res.status(200).json(event);
};

export const createEvent = async (req: express.Request, res: express.Response) => {
  const event: Event = req.body;
  const eventCreated = await eventServices.createEvent(event);
  res.status(201).json(eventCreated);
};

export const updateEvent = async (req: express.Request, res: express.Response) => {
  const eventId: string = req.params.eventId;
  const eventUpdateParams: Event = req.body;
  const eventUpdated = await eventServices.updateEvent(eventId, eventUpdateParams);
  res.status(200).json(eventUpdated);
};

export const deleteEvent = async (req: express.Request, res: express.Response) => {
  const eventId: string = req.params.eventId;
  await eventServices.deleteEvent(eventId);
  res.status(204).json();
};

export default {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
}