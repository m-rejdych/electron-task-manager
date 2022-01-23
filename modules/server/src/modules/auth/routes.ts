import { Router } from 'express';

import { registerHandler } from './handlers';
import { RegisterDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';

const router = Router();

router.post('/register', validationMiddleware(RegisterDto), registerHandler);

router.put('/login', () => {});

export default router;
