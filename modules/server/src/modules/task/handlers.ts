import type Task from './entity';
import type JwtAuthHandler from '../../types/JwtAuthHandler';
import type { CreateTaskDto } from './dto';
import { createTask } from './services';

export const createTaskHandler: JwtAuthHandler<
  {},
  Task,
  CreateTaskDto
> = async (req, res, next) => {
  try {
    const task = await createTask(req.user as number, req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
