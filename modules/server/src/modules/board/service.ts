import { getRepository, FindOneOptions } from 'typeorm';

import type { CreateBoardDto } from './dto';
import { findOne as findOneUser } from '../user/services';
import Board from './entity';
import createError from '../../util/createError';

export const findOne = async (
  optionsOrId: number | FindOneOptions,
  options?: FindOneOptions,
): Promise<Board | null> => {
  const repository = getRepository(Board);

  const board = await (typeof optionsOrId === 'number'
    ? repository.findOne(optionsOrId, options)
    : repository.findOne(optionsOrId));

  return board || null;
};

export const createBoard = async (
  userId: number,
  { name }: CreateBoardDto,
): Promise<Board> => {
  const user = await findOneUser(userId);

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

export const validateMember = async (
  userId: number,
  boardId: number,
): Promise<boolean> => {
  const repository = getRepository(Board);

  const board = await repository
    .createQueryBuilder('board')
    .leftJoin('board.users', 'user')
    .where('board.id = :boardId', { boardId })
    .andWhere('user.id = :userId', { userId })
    .getOne();

  return !!board;
};
