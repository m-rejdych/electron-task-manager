import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

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
    entities: ["./entity/*.ts"],
  });

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', async (_, res) => {
    res.json({ message: 'heelo!' });
  });

  app.listen(process.env.PORT, () => {
    console.log(`App is running on http://localhost:${process.env.PORT}`);
  });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

main();
