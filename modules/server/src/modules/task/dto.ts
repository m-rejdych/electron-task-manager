import { IsString, IsNotEmpty, IsIn, IsInt, Min } from 'class-validator';

import type { ColumnName } from '../columnType/types';
import { COLUMN_NAMES } from '../columnType/constants';

export class CreateTaskDto {
  @IsString({ message: 'Task name can must be a string.' })
  @IsNotEmpty({ message: 'Task name can not be empty.' })
  name: string;

  @IsIn(COLUMN_NAMES, {
    message:
      'Column name must be one of the following: notStarted, doing, done.',
  })
  column: ColumnName;

  @IsInt({ message: 'Board id needs to be an integer.' })
  @Min(1, { message: 'Board id needs to be higher than 0.' })
  boardId: number;
}
