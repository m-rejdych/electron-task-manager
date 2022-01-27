import { getRepository } from 'typeorm';

import ColumnType from './entity';
import createError from '../../util/createError';
import type { ColumnName } from './types';
import { COLUMN_NAMES } from './constants';

export const findByName = async (
  name: ColumnName,
): Promise<ColumnType> => {
  if (!COLUMN_NAMES.includes(name)) {
    const error = createError(
      400,
      'Column name must be one of the following: notStarted, doing, done.',
    );
    throw error;
  }

  const repository = getRepository(ColumnType);

  const columnType = await repository.findOne({ where: { name } });

  if (!columnType) {
    const error = createError(404, 'Column type not found.');
    throw error;
  }

  return columnType;
};
