import { Router } from 'express';

import { getUserByIdHandler } from './handlers';
import jwtGuardMiddleware from '../../middleware/jwtGuardMiddleware';

const router = Router();

router.get('/get-by-id', jwtGuardMiddleware, getUserByIdHandler);

export default router;
