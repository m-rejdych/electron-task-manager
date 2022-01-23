import type { RequestHandler } from 'express';

import type { CreateTaskDto } from './dto';
import type Task from './entity';
import { createTask } from './services';

export const createTaskHandler: RequestHandler<{}, Task, CreateTaskDto> = async (
  req,
  res,
  next,
) => {
  try {
    const task = await createTask(req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
