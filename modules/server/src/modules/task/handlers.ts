import type Task from './entity';
import type JwtAuthHandler from '../../types/JwtAuthHandler';
import type { CreateTaskDto } from './dto';
import createError from '../../util/createError';
import { createTask, getByBoardId } from './services';

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

export const getByBoardIdHandler: JwtAuthHandler<
  {},
  {},
  {},
  { boardId?: string }
> = async (req, res, next) => {
  try {
    if (!req.query.boardId) {
      const error = createError(400, 'boardId query must be specified.');
      throw error;
    }

    const tasks = await getByBoardId(
      req.user as number,
      parseInt(req.query.boardId),
    );

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
