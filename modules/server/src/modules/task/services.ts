import { getRepository } from 'typeorm';

import Task from './entity';
import createError from '../../util/createError';
import { findOne as findOneUser } from '../user/services';
import { findByName } from '../columnType/services';
import { validateMember, findOne as findOneBoard } from '../board/service';
import type { CreateTaskDto } from './dto';

export const createTask = async (
  userId: number,
  { name, column, boardId }: CreateTaskDto,
): Promise<Task> => {
  const taskRepository = getRepository(Task);

  const columnType = await findByName(column);

  const user = await findOneUser(userId);

  if (!user) {
    const error = createError(404, 'User not found.');
    throw error;
  }

  const board = await findOneBoard(boardId);

  if (!board) {
    const error = createError(404, 'Board not found');
    throw error;
  }

  const task = taskRepository.create({
    column: columnType,
    creator: user,
    board,
    name,
  });

  await taskRepository.save(task);

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
