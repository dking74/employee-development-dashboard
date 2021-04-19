import { Router } from 'express';

import {
    getAllCertifications,
    createCertification,
    getCertification,
    updateCertification,
    deleteCertification
} from '../controllers/certifications';
import { certificationQueryProperties } from '@constants';
import asyncWrapper from '@utils/service.util';
import convertQueryParameters from '../middleware/convertQueryParameters';
import convertUserRequestBody from '../middleware/convertUserRequestBody';
import validateCertificationExists from '../middleware/validateCertificationExists';
import validateBody, { createCertificationSchema, updateCertificationSchema } from '../validations';

const router = Router({ mergeParams: true });
router.get('', [convertQueryParameters(certificationQueryProperties)], asyncWrapper(getAllCertifications));
router.get('/:certificationId', [validateCertificationExists], asyncWrapper(getCertification));
router.post('', [validateBody(createCertificationSchema), convertUserRequestBody], asyncWrapper(createCertification));
router.put('/:certificationId', [validateCertificationExists, validateBody(updateCertificationSchema)], asyncWrapper(updateCertification));
router.delete('/:certificationId', [validateCertificationExists], asyncWrapper(deleteCertification));

export default router;