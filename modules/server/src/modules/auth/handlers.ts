import { RequestHandler } from 'express';

import { register } from './services';
import type { RegisterDto } from './dto';
import type User from '../user/entity';

export const registerHandler: RequestHandler<
  {},
  Omit<User, 'password'>,
  RegisterDto
> = async (req, res, next) => {
  try {
    const {
      user: { password, ...user },
      jwt,
    } = await register(req.body);

    res.cookie('jwt', jwt, { httpOnly: true, maxAge: 3600000 });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
