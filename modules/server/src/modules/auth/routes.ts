import { Router } from 'express';

import { registerHandler, loginHandler } from './handlers';
import { RegisterDto, LoginDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';

const router = Router();

router.post('/register', validationMiddleware(RegisterDto), registerHandler);

router.put('/login', validationMiddleware(LoginDto), loginHandler);

export default router;
