import { Router } from 'express';

import { CreateTaskDto } from './dto';
import validationMiddleware from '../../middleware/validationMiddleware';
import { createTaskHandler } from './handlers';

const router = Router();

router.post(
  '/create-task',
  validationMiddleware(CreateTaskDto),
  createTaskHandler,
);

export default router;
