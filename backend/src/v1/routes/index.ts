import { Router } from 'express';

import users from './users';
import achievements from './achievements';
import certifications from './certifications';

import validateUserId from '../middleware/validateUserId';

const router = Router();
router.use('/users', users);
router.use('/users/:userId/achievements', [validateUserId], achievements);
router.use('/users/:userId/certifications', [validateUserId], certifications);

/**
 * import goals from './goals;
 * import userEvents from './user-events';
 * import userTraining from './user-training';
 * import events from './events';
 * import training from './training';
 * 
 * router.use('/users/:userId/goals', [validateUserId], goals);
 * router.use('/users/:userId/events', [validateUserId], userEvents);
 * router.use('/users/:userId/training', [validateUserId], userTraining);
 * router.use('/events', events);
 * router.use('/training', training);
 */


export default router;