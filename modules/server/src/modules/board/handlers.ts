import type JwtAuthHandler from '../../types/JwtAuthHandler';
import type Board from './entity';
import type { CreateBoardDto } from './dto';
import { createBoard, getBoardsByUserId } from './service';

export const createBoardHandler: JwtAuthHandler<
  {},
  Board,
  CreateBoardDto
> = async (req, res, next) => {
  try {
    const board = await createBoard(req.user as number, req.body);

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const getBoardsByUserIdHandler: JwtAuthHandler = async (req, res, next) => {
  try {
    const boards = await getBoardsByUserId(req.user as number);

    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
};
