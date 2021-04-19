import { Router } from 'express';

import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '@v1/controllers/users';
import convertQueryParameters from '@v1/middleware/convertQueryParameters';
import validateUserExists from '@v1/middleware/validateUserId';
import { userQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import validateBody, { createUserBodySchema, updateUserBodySchema } from '../validations';

const router = Router();
router.get('', [convertQueryParameters(userQueryProperties)], asyncWrapper(getAllUsers));
router.get('/:userId', [validateUserExists], asyncWrapper(getUser));
router.post('', [validateBody(createUserBodySchema)], asyncWrapper(createUser));
router.put('/:userId', [validateUserExists, validateBody(updateUserBodySchema)], asyncWrapper(updateUser));
router.delete('/:userId', [validateUserExists], asyncWrapper(deleteUser));

export default router;