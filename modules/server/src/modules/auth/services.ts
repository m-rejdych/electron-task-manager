import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

import type { RegisterDto } from './dto';
import type { RegisterService } from './interfaces';
import User from '../user/entity';

dotenv.config();

export const register = async ({
  password,
  ...rest
}: RegisterDto): Promise<RegisterService> => {
  const userRepository = getRepository(User);

  const hashedPassword = await hash(password, 12);

  const user = userRepository.create({
    password: hashedPassword,
    ...rest,
  });
  await userRepository.save(user);

  const jwt = sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return {
    user,
    jwt,
  };
};
