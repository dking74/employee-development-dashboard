import { Router } from 'express';
import { getAllUsers } from '@v1-controllers/users';

const router = Router();
router.get('/users', getAllUsers);

export default router;