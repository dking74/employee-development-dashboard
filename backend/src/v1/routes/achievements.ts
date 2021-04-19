import { Router } from 'express';

import {
    getAllAchievements,
    createAchievement,
    getAchievement,
    updateAchievement,
    deleteAchievement
} from '../controllers/achievements';
import { achievementQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateAchievementExists from '../middleware/validateAchievementId';
import validateBody, { createAchievementSchema, updateAchievementSchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(achievementQueryProperties)], asyncWrapper(getAllAchievements));
router.get('/:achievementId', [validateAchievementExists], asyncWrapper(getAchievement));
router.post('', [validateBody(createAchievementSchema), convertUserRequestBody], asyncWrapper(createAchievement));
router.put('/:achievementId', [validateAchievementExists, validateBody(updateAchievementSchema)], asyncWrapper(updateAchievement));
router.delete('/:achievementId', [validateAchievementExists], asyncWrapper(deleteAchievement));

export default router;