import { put, takeEvery, call } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import type Task from '../../../types/Task';
import type { Tasks } from './types';
import { ColumnNames } from '../../../types/ColumnType';
import {
  getTasksService,
  createTaskService,
} from '../../../services/tasksServices';
import {
  Actions,
  getTasks,
  createTask,
  setTasks,
  addTask,
  setError,
} from './actions';

const parseTasks = (tasks: Task[]): Tasks => ({
  notStarted: tasks.filter(
    ({ column }) => column?.name === ColumnNames.NotStarted,
  ),
  doing: tasks.filter(({ column }) => column?.name === ColumnNames.Doing),
  done: tasks.filter(({ column }) => column?.name === ColumnNames.Done),
});

function* handleGetTasks({ payload }: ReturnType<typeof getTasks>) {
  try {
    const response: AxiosResponse<Task[]> = yield call(
      getTasksService,
      payload,
    );

    yield put(setTasks(parseTasks(response.data)));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  }
}

function* handleCreateTask({ payload }: ReturnType<typeof createTask>) {
  try {
    const response: AxiosResponse<Task> = yield call(
      createTaskService,
      payload,
    );
    yield put(addTask({ column: payload.column, task: response.data }));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  }
}

function* getTasksSaga() {
  yield takeEvery(Actions.GetTasks, handleGetTasks);
}

function* createTaskSaga() {
  yield takeEvery(Actions.CreateTask, handleCreateTask);
}

export default [getTasksSaga(), createTaskSaga()];
