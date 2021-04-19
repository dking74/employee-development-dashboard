import { Router } from 'express';

import users from './users';
import achievements from './achievements';
import certifications from './certifications';

import validateUserId from '../middleware/validateUserId';

const router = Router();
router.use('/users', users);
router.use('/users/:userId/achievements', [validateUserId], achievements);
router.use('/users/:userId/certifications', [validateUserId], certifications);


export default router;