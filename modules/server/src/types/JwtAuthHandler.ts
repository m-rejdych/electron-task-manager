import { Request, Response, NextFunction } from 'express';

interface JwtAuthRequest<T = {}, U = {}, V = {}, W = {}, Y = {}>
  extends Request<T, U, V, W, Y> {
  user?: number;
}

type JwtAuthHandler<T = {}, U = {}, V = {}, W = {}, Y = {}> = (
  req: JwtAuthRequest<T, U, V, W, Y>,
  res: Response<T, Y>,
  next: NextFunction,
) => void | Promise<void>;

export default JwtAuthHandler;
