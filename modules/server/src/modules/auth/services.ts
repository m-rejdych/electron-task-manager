import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { FindOneOptions } from 'typeorm';
import dotenv from 'dotenv';

import type { RegisterDto, LoginDto } from './dto';
import type { AuthService } from './interfaces';
import User from '../user/entity';
import createError from '../../util/createError';

dotenv.config();

const findOne = async (
  optionsOrId: number | FindOneOptions,
  options?: FindOneOptions,
): Promise<User | null> => {
  const repository = getRepository(User);

  const user = await (typeof optionsOrId === 'number'
    ? repository.findOne(optionsOrId, options)
    : repository.findOne(optionsOrId));

  return user || null;
};

export const register = async ({
  password,
  ...rest
}: RegisterDto): Promise<AuthService> => {
  const repository = getRepository(User);

  const hashedPassword = await hash(password, 12);

  const user = repository.create({
    password: hashedPassword,
    ...rest,
  });
  await repository.save(user);

  const jwt = sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return {
    user,
    jwt,
  };
};

export const login = async ({
  email,
  password,
}: LoginDto): Promise<AuthService> => {
  const user = await findOne({
    where: { email },
    select: ['password', 'id', 'email', 'username', 'createdAt', 'updatedAt'],
  });

  if (!user) {
    const error = createError(401, 'Invalid email or password.');
    throw error;
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    const error = createError(401, 'Invalid email or password.');
    throw error;
  }

  const jwt = sign({ userId: user.id }, process.env.JWT_SECRET as string);

  return {
    user,
    jwt,
  };
};
