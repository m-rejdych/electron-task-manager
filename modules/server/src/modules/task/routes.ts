import { Router } from 'express';

import { CreateTaskDto, UpdateTaskDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';
import jwtGuardMiddleware from '../../middleware/jwtGuardMiddleware';
import {
  createTaskHandler,
  updateTaskHandler,
  getByBoardIdHandler,
} from './handlers';

const router = Router();

router.post(
  '/create-task',
  jwtGuardMiddleware,
  validationMiddleware(CreateTaskDto),
  createTaskHandler,
);

router.put(
  '/update-task',
  jwtGuardMiddleware,
  validationMiddleware(UpdateTaskDto),
  updateTaskHandler,
);

router.get('/get-by-board-id', jwtGuardMiddleware, getByBoardIdHandler);

export default router;
