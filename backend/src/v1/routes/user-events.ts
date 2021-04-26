import { Router } from 'express';

import {
    getAllUserEvents,
    createUserEvent,
    getUserEvent,
    updateUserEvent,
    deleteUserEvent
} from '../controllers/user-events';
import { userEventQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateUserEventExists from '../middleware/validations/validateEventId';
import validateBody, { createUserEventSchema, updateUserEventSchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(userEventQueryProperties)], asyncWrapper(getAllUserEvents));
router.get('/:eventId', [validateUserEventExists], asyncWrapper(getUserEvent));
router.post('', [validateBody(createUserEventSchema), convertUserRequestBody], asyncWrapper(createUserEvent));
router.put('/:eventId', [validateUserEventExists, validateBody(updateUserEventSchema)], asyncWrapper(updateUserEvent));
router.delete('/:eventId', [validateUserEventExists], asyncWrapper(deleteUserEvent));

export default router;