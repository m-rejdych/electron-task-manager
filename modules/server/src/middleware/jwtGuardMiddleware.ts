import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

import createError from '../util/createError';
import type JwtAuthHandler from '../types/JwtAuthHandler';
import type JwtUserPayload from '../types/JwtUserPayload';

dotenv.config();

const jwtGuardMiddleware: JwtAuthHandler = (req, _, next): void => {
  const jwt: string | undefined = req.cookies.jwt;

  if (!jwt) {
    const error = createError(401, 'User is not logged in.');
    throw error;
  }

  verify(jwt as string, process.env.JWT_SECRET as string, (err, data) => {
    if (err) {
      console.log(err);
      const error = createError(401, 'Invalid token');
      throw error;
    }

    req.user = (data as JwtUserPayload).userId;

    next();
  });
};

export default jwtGuardMiddleware;
