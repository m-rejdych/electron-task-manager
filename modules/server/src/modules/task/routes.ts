import { Router } from 'express';

import { CreateTaskDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';
import jwtGuardMiddleware from '../../middleware/jwtGuardMiddleware';
import { createTaskHandler, getByBoardIdHandler } from './handlers';

const router = Router();

router.post(
  '/create-task',
  jwtGuardMiddleware,
  validationMiddleware(CreateTaskDto),
  createTaskHandler,
);

router.get('/get-by-board-id', jwtGuardMiddleware, getByBoardIdHandler);

export default router;
