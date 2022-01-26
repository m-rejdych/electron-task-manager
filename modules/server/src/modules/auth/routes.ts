import { Router } from 'express';

import { registerHandler, loginHandler, autologinHandler } from './handlers';
import { RegisterDto, LoginDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';

const router = Router();

router.post('/register', validationMiddleware(RegisterDto), registerHandler);

router.put('/login', validationMiddleware(LoginDto), loginHandler);

router.get('/autologin', autologinHandler);

export default router;
