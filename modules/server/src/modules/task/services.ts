import { Handler } from 'express';
import { getRepository } from 'typeorm';

import Task from './entity';

interface CreateTaskDto {
  name: string;
}

export const createTask: Handler = async (req, res, next) => {
  try {
    const taskRepository = getRepository(Task);

    const { name } = req.body as CreateTaskDto;

    const task = taskRepository.create({
      name,
    });

    await taskRepository.save(task);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
