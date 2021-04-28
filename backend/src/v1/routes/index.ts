import { Router } from 'express';

import users from './users';
import achievements from './achievements';
import certifications from './certifications';
import goals from './goals';
import events from './events';
import trainings from './trainings';

import validateUserId from '../middleware/validations/validateUserId';

const router = Router();
router.use('/users', users);
router.use('/users/:userId/achievements', [validateUserId], achievements);
router.use('/users/:userId/certifications', [validateUserId], certifications);
router.use('/users/:userId/goals', [validateUserId], goals);

router.use('/events', events);
router.use('/trainings', trainings);

// import userEvents from './user-events';
// import userTraining from './user-training';

// router.use('/users/:userId/events', [validateUserId], userEvents);
// router.use('/users/:userId/training', [validateUserId], userTraining);


export default router;