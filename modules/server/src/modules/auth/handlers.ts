import { RequestHandler } from 'express';
import dotenv from 'dotenv';

import { register, login, autologin } from './services';
import type { RegisterDto, LoginDto } from './dto';
import type User from '../user/entity';

dotenv.config();

const __prod__ = process.env.NODE_ENV === 'production';

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

    res.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 3600000,
      secure: __prod__,
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginHandler: RequestHandler<{}, {}, LoginDto> = async (
  req,
  res,
  next,
) => {
  try {
    const {
      user: { password, ...user },
      jwt,
    } = await login(req.body);

    res.cookie('jwt', jwt, {
      httpOnly: true,
      maxAge: 3600000,
      secure: __prod__,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const autologinHandler: RequestHandler<{}, User | null> = async (req, res, next) => {
  try {
    const user = await autologin(req.cookies);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
