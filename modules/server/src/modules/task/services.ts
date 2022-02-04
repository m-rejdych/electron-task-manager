import { getRepository, FindOneOptions } from 'typeorm';

import Task from './entity';
import createError from '../../util/createError';
import { findOne as findOneUser } from '../user/services';
import { findByName } from '../columnType/services';
import { validateMember, findOne as findOneBoard } from '../board/service';
import type { CreateTaskDto, UpdateTaskDto } from './dto';

export const findOne = async (
  taskId: number | FindOneOptions,
  options?: FindOneOptions,
): Promise<Task | null> => {
  const repository = getRepository(Task);
  const task =
    typeof taskId === 'object'
      ? await repository.findOne(taskId)
      : await repository.findOne(taskId, options);

  return task ?? null;
};

export const createTask = async (
  userId: number,
  { name, column, boardId }: CreateTaskDto,
): Promise<Task> => {
  const user = await findOneUser(userId);
  if (!user) {
    const error = createError(404, 'User not found.');
    throw error;
  }

  const isValidUser = await validateMember(userId, boardId);
  if (!isValidUser) {
    const error = createError(
      403,
      'You need to be a member of board to see the tasks.',
    );
    throw error;
  }

  const columnType = await findByName(column);

  const board = await findOneBoard(boardId);

  if (!board) {
    const error = createError(404, 'Board not found');
    throw error;
  }

  const taskRepository = getRepository(Task);

  const task = taskRepository.create({
    column: columnType,
    creator: user,
    board,
    name,
  });

  await taskRepository.save(task);

  return task;
};

export const updateTask = async (
  userId: number,
  { name, column, taskId }: UpdateTaskDto,
) => {
  const user = await findOneUser(userId);
  if (!user) {
    const error = createError(404, 'User not found.');
    throw error;
  }

  const task = await findOne(taskId, {
    loadRelationIds: { relations: ['board'] },
  });
  if (!task) {
    const erorr = createError(404, 'Task not found.');
    throw erorr;
  }

  const isValidUser = await validateMember(userId, task.board!.id);
  if (!isValidUser) {
    const error = createError(
      403,
      'You need to be a member of board to see the tasks.',
    );
    throw error;
  }

  if (column) {
    const columnType = await findByName(column);
    task.column = columnType;
  }

  if (name) task.name = name;

  const repository = getRepository(Task);
  await repository.save(task);

  return task;
};

export const getByBoardId = async (
  userId: number,
  boardId: number,
): Promise<Task[]> => {
  const isValidUser = await validateMember(userId, boardId);

  if (!isValidUser) {
    const error = createError(
      403,
      'You need to be a member of board to see the tasks.',
    );
    throw error;
  }
  const repository = getRepository(Task);

  const tasks = await repository
    .createQueryBuilder('task')
    .leftJoin('task.board', 'board')
    .leftJoinAndSelect('task.column', 'column')
    .leftJoinAndSelect('column.type', 'columnType')
    .where('board.id = :boardId', { boardId })
    .getMany();

  return tasks;
};
