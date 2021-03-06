import { Router } from 'express';

import {
    getAllTrainings,
    createTraining,
    getTraining,
    updateTraining,
    updateTrainingRating,
    updateTrainingViews,
    deleteTraining
} from '../controllers/trainings';
import { trainingQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import validateTrainingExists from '../middleware/validations/validateTrainingId';
import validateBody, { createTrainingBodySchema, updateTrainingBodySchema, updateTrainingRatingBodySchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(trainingQueryProperties, '', { rating: '>', views: '>' })], asyncWrapper(getAllTrainings));
router.get('/:trainingId', [validateTrainingExists], asyncWrapper(getTraining));
router.post('', [validateBody(createTrainingBodySchema)], asyncWrapper(createTraining));
router.put('/:trainingId', [validateTrainingExists, validateBody(updateTrainingBodySchema)], asyncWrapper(updateTraining));
router.put('/:trainingId/rating', [validateTrainingExists, validateBody(updateTrainingRatingBodySchema)], asyncWrapper(updateTrainingRating));
router.put('/:trainingId/views', [validateTrainingExists], asyncWrapper(updateTrainingViews));
router.delete('/:trainingId', [validateTrainingExists], asyncWrapper(deleteTraining));

export default router;