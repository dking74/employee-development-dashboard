import { Router, Request, Response, NextFunction } from 'express';

import {
    getAllUserTrainings,
    createUserTraining,
    getUserTraining,
    updateUserTraining,
    deleteUserTraining
} from '../controllers/user-trainings';
import { userTrainingQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateUserTrainingExists from '../middleware/validations/validateUserTrainingId';
import validateBody, { createUserTrainingSchema, updateUserTrainingSchema } from '../validations';

const convertUserTrainingBody = <T>(req: Request, res: Response, next: NextFunction) => {
    const reqBody = {
      ...req.requestBody,
      training_id: req.params.trainingId
    };
    req.requestBody = ((reqBody as any) as T);
  
    return next();
  };

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(userTrainingQueryProperties, 'public."UserTraining"')], asyncWrapper(getAllUserTrainings));
router.get('/:trainingId', [validateUserTrainingExists], asyncWrapper(getUserTraining));
router.post('/:trainingId', [validateBody(createUserTrainingSchema), convertUserRequestBody, convertUserTrainingBody], asyncWrapper(createUserTraining));
router.put('/:trainingId', [validateUserTrainingExists, validateBody(updateUserTrainingSchema)], asyncWrapper(updateUserTraining));
router.delete('/:trainingId', [validateUserTrainingExists], asyncWrapper(deleteUserTraining));

export default router;