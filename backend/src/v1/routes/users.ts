import { Router } from 'express';

import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '@v1/controllers/users';
import convertQueryParameters from '@v1/middleware/convertQueryParameters';
import { userQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import validateBody, { createUserBodySchema, updateUserBodySchema } from '../validations';

const router = Router();
router.get('', [convertQueryParameters(userQueryProperties)], asyncWrapper(getAllUsers));
router.get('/:userId', asyncWrapper(getUser));
router.post('', [validateBody(createUserBodySchema)], asyncWrapper(createUser));
router.put('/:userId', [validateBody(updateUserBodySchema)], asyncWrapper(updateUser));
router.delete('/:userId', asyncWrapper(deleteUser));

export default router;