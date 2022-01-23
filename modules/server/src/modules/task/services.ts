import { getRepository } from 'typeorm';

import Task from './entity';
import { CreateTaskDto } from './dto';

export const createTask = async ({ name }: CreateTaskDto): Promise<Task> => {
  const taskRepository = getRepository(Task);

  const task = taskRepository.create({
    name,
  });

  await taskRepository.save(task);

  return task;
};
