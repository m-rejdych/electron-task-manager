import { Router } from 'express';

import { CreateBoardDto } from './dto';
import { createBoardHandler, getBoardsByUserIdHandler } from './handlers';
import jwtGuardMiddleware from '../../middleware/jwtGuardMiddleware';
import validationMiddleware from '../../middleware/validationMiddleware';

const router = Router();

router.post(
  '/create-board',
  jwtGuardMiddleware,
  validationMiddleware(CreateBoardDto),
  createBoardHandler,
);

router.get('/get-boards', jwtGuardMiddleware, getBoardsByUserIdHandler);

export default router;
