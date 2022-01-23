import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

import type ExtendedError from './types/ExtendedError';
import taskRoutes from './modules/task/routes';
import entities from './entities';

dotenv.config();

const main = async () => {
  try {
    const app = express();

    await createConnection({
      username: process.env.DB_USERNAME as string,
      port: parseInt(process.env.DB_PORT as string),
      database: process.env.DB_NAME as string,
      password: process.env.DB_PASSWORD as string,
      host: process.env.DB_HOST as string,
      synchronize: true,
      logging: true,
      type: 'postgres',
      entities,
    });

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/task', taskRoutes);
    app.use(
      (error: ExtendedError, _: Request, res: Response, ___: NextFunction) => {
        console.log(error);
        const { status, message } = error;
        res
          .status(error.status ?? 500)
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
