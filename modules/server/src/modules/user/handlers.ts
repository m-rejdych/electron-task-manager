import JwtAuthHandler from '../../types/JwtAuthHandler';

import type User from './entity';
import createError from '../../util/createError';
import { findOne } from './services';

export const getUserByIdHandler: JwtAuthHandler<
  {},
  User,
  {},
  { userId: string }
> = async (req, res, next) => {
  try {
    const user = await findOne(parseInt(req.query.userId) as number);

    if (!user) {
      const error = createError(404, 'User not found.');
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
