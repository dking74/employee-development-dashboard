import { Router } from 'express';

import {
    getAllEvents,
    createEvent,
    getEvent,
    updateEvent,
    deleteEvent
} from '../controllers/events';
import { eventQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import validateEventExists from '../middleware/validations/validateEventId';
import validateBody, { createEventBodySchema, updateEventBodySchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(eventQueryProperties)], asyncWrapper(getAllEvents));
router.get('/:eventId', [validateEventExists], asyncWrapper(getEvent));
router.post('', [validateBody(createEventBodySchema)], asyncWrapper(createEvent));
router.put('/:eventId', [validateEventExists, validateBody(updateEventBodySchema)], asyncWrapper(updateEvent));
router.delete('/:eventId', [validateEventExists], asyncWrapper(deleteEvent));

export default router;