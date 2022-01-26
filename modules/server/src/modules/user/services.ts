import { getRepository, FindOneOptions } from 'typeorm';

import User from './entity';

export const findOne = async (
  optionsOrId: number | FindOneOptions,
  options?: FindOneOptions,
): Promise<User | null> => {
  const repository = getRepository(User);

  const user = await (typeof optionsOrId === 'number'
    ? repository.findOne(optionsOrId, options)
    : repository.findOne(optionsOrId));

  return user || null;
};
