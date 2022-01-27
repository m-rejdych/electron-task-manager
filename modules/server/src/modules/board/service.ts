import { getRepository } from 'typeorm';

import type { CreateBoardDto } from './dto';
import { findOne } from '../user/services';
import Board from './entity';
import createError from '../../util/createError';

export const createBoard = async (
  userId: number,
  { name }: CreateBoardDto,
): Promise<Board> => {
  const user = await findOne(userId);

  if (!user) {
    const error = createError(404, 'User not found.');
    throw error;
  }

  const repository = getRepository(Board);

  const board = repository.create({
    users: [user],
    name,
  });

  await repository.save(board);

  return board;
};

export const getBoardsByUserId = async (userId: number): Promise<Board[]> => {
  const repository = getRepository(Board);

  const boards = await repository
    .createQueryBuilder('board')
    .leftJoin('board.users', 'users')
    .where('users.id = :userId', { userId })
    .getMany();

  return boards;
};
