import { Router } from 'express';

import {
    getAllUserTrainings,
    createUserTraining,
    getUserTraining,
    updateUserTraining,
    deleteUserTraining
} from '../controllers/user-trainings';
import { UserTrainingQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateUserTrainingExists from '../middleware/validations/validateTrainingId';
import validateBody, { createUserTrainingSchema, updateUserTrainingSchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(UserTrainingQueryProperties)], asyncWrapper(getAllUserTrainings));
router.get('/:trainingId', [validateUserTrainingExists], asyncWrapper(getUserTraining));
router.post('', [validateBody(createUserTrainingSchema), convertUserRequestBody], asyncWrapper(createUserTraining));
router.put('/:trainingId', [validateUserTrainingExists, validateBody(updateUserTrainingSchema)], asyncWrapper(updateUserTraining));
router.delete('/:trainingId', [validateUserTrainingExists], asyncWrapper(deleteUserTraining));

export default router;