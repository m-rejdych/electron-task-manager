import axios, { type AxiosResponse } from 'axios';

import type { CreateTaskPayload } from '../store/ducks/tasks/types';
import type Task from '../types/Task';

const TASK_API = `${process.env.API_URI}/task` as const;

export const getTasks = (boardId: number): Promise<AxiosResponse<Task[]>> =>
  axios.get(`${TASK_API}/get-by-board-id?boardId=${boardId}`, {
    withCredentials: true,
  });

export const createTaskService = async (
  data: CreateTaskPayload,
): Promise<AxiosResponse<Task>> =>
  axios.post(`${TASK_API}/create-task`, data, { withCredentials: true });
