import { Router } from 'express';

import {
    getAllGoals,
    createGoal,
    getGoal,
    updateGoal,
    deleteGoal
} from '../controllers/goals';
import { goalQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateGoalExists from '../middleware/validations/validateGoalId';
import validateBody, { createGoalBodySchema, updateGoalBodySchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(goalQueryProperties)], asyncWrapper(getAllGoals));
router.get('/:goalId', [validateGoalExists], asyncWrapper(getGoal));
router.post('', [validateBody(createGoalBodySchema), convertUserRequestBody], asyncWrapper(createGoal));
router.put('/:goalId', [validateGoalExists, validateBody(updateGoalBodySchema)], asyncWrapper(updateGoal));
router.delete('/:goalId', [validateGoalExists], asyncWrapper(deleteGoal));

export default router;