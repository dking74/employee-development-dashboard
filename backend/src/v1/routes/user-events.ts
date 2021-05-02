import { Router, Request, Response, NextFunction } from 'express';

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
import validateUserEventExists from '../middleware/validations/validateUserEventId';
import validateBody, { createUserEventSchema, updateUserEventSchema } from '../validations';

const convertUserEventBody = <T>(req: Request, res: Response, next: NextFunction) => {
  const reqBody = {
    ...req.requestBody,
    event_id: req.params.eventId,
  };
  req.requestBody = ((reqBody as any) as T);

  return next();
};

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(userEventQueryProperties, 'public."UserEvent"')], asyncWrapper(getAllUserEvents));
router.get('/:eventId', [validateUserEventExists], asyncWrapper(getUserEvent));
router.post('/:eventId', [validateBody(createUserEventSchema), convertUserRequestBody, convertUserEventBody], asyncWrapper(createUserEvent));
router.put('/:eventId', [validateUserEventExists, validateBody(updateUserEventSchema)], asyncWrapper(updateUserEvent));
router.delete('/:eventId', [validateUserEventExists], asyncWrapper(deleteUserEvent));

export default router;