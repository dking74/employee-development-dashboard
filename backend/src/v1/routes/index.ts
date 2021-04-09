import { Router } from 'express';

import { getAllUsers, getUser } from '@v1/controllers/users';
import convertQueryParameters from '@v1/middleware/convertQueryParameters';
import { userQueryProperties } from '@constants';

const router = Router();
router.get('/users', [convertQueryParameters(userQueryProperties)], getAllUsers);
router.get('/users/:userId', getUser);

export default router;