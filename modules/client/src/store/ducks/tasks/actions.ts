import createActionCreator from '../../util/createActionCreator';

import { Tasks, AddTaskPayload, CreateTaskPayload } from './types';

export const enum Actions {
  GetTasks = 'GET_TASKS',
  SetTasks = 'SET_TASKS',
  CreateTask = 'CREATE_TASK',
  AddTask = 'ADD_TASK',
  SetError = 'SET_ERROR',
}

export const getTasks = createActionCreator<Actions.GetTasks, number>(
  Actions.GetTasks,
);

export const setTasks = createActionCreator<Actions.SetTasks, Tasks>(
  Actions.SetTasks,
);

export const createTask = createActionCreator<
  Actions.CreateTask,
  CreateTaskPayload
>(Actions.CreateTask);

export const addTask = createActionCreator<Actions.AddTask, AddTaskPayload>(
  Actions.AddTask,
);

export const setError = createActionCreator<Actions.SetError, string | null>(
  Actions.SetError,
);
