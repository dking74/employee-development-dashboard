import { Router } from 'express';

import { getAllUsers, getUser, createUser } from '@v1/controllers/users';
import convertQueryParameters from '@v1/middleware/convertQueryParameters';
import { userQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import validateBody, { createUserBodySchema } from '../validations';

const router = Router();
router.get('', [convertQueryParameters(userQueryProperties)], asyncWrapper(getAllUsers));
router.get('/:userId', asyncWrapper(getUser));
router.post('', [validateBody(createUserBodySchema)], asyncWrapper(createUser));

export default router;