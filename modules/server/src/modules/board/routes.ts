import { Router } from 'express';

import { CreateBoardDto } from './dto';
import { createBoardHandler } from './handlers';
import jwtGuardMiddleware from '../../middleware/jwtGuardMiddleware';
import validationMiddleware from '../../middleware/validationMiddleware';

const router = Router();

router.post(
  '/create-board',
  jwtGuardMiddleware,
  validationMiddleware(CreateBoardDto),
  createBoardHandler,
);

export default router;
