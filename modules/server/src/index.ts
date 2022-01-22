import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'heelo!' });
})

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
})
