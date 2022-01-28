import { ColumnNames } from '../../../types/ColumnType';

import type Task from '../../../types/Task';

export interface Tasks {
  [ColumnNames.NotStarted]: Task[];
  [ColumnNames.Doing]: Task[];
  [ColumnNames.Done]: Task[];
}

export interface State {
  tasks: Tasks;
  loading: boolean;
  error: string | null;
}

export interface CreateTaskPayload {
  name: string;
  column: ColumnNames;
  boardId: number;
}

export interface AddTaskPayload {
  type: ColumnNames;
  task: Task;
}
