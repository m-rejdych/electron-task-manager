import { Request, Response, NextFunction } from 'express';

interface JwtAuthRequest<T = any, U = any, V = any, W = any, Y = any>
  extends Request<T, U, V, W, Y> {
  user?: number;
}

type JwtAuthHandler<T = any, U = any, V = any, W = any, Y = any> = (
  req: JwtAuthRequest<T, U, V, W, Y>,
  res: Response<U, Y>,
  next: NextFunction,
) => void | Promise<void>;

export default JwtAuthHandler;
