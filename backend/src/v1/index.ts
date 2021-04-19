import { Router } from 'express';

import routes from './routes';
import authMiddleware from './middleware/auth';

const router = Router({ mergeParams: true });

// Secure API with Auth0
router.use(authMiddleware);
router.use(routes);

export default router;