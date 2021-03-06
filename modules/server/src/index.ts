import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import type ExtendedError from './types/ExtendedError';
import taskRoutes from './modules/task/routes';
import authRoutes from './modules/auth/routes';
import userRoutes from './modules/user/routes';
import boardRoutes from './modules/board/routes';
import entities from './entities';

dotenv.config();

const main = async (): Promise<void> => {
  try {
    const app = express();

    await createConnection({
      username: process.env.DB_USERNAME,
      port: parseInt(process.env.DB_PORT as string),
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      synchronize: true,
      logging: true,
      type: 'postgres',
      entities,
    });

    app.use(helmet());
    app.use(cors({ credentials: true, origin: process.env.CLIENT_URI }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/task', taskRoutes);
    app.use('/auth', authRoutes);
    app.use('/user', userRoutes);
    app.use('/board', boardRoutes);
    app.use(
      (error: ExtendedError, _: Request, res: Response, ___: NextFunction) => {
        console.log(error);
        const { status, message } = error;
        res
          .status(status ?? 500)
          .json({ status: status ?? 500, message });
      },
    );

    app.listen(process.env.PORT, () => {
      console.log(`App is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

main();
