import axios, { AxiosResponse } from 'axios';

import type Board from '../types/Board';

const BOARD_API = `${process.env.API_URI}/board` as const;

export const createBoardService = (
  name: string,
): Promise<AxiosResponse<Board>> =>
  axios.post(`${BOARD_API}/create-board`, { name }, { withCredentials: true });

export const getBoardsService = (): Promise<AxiosResponse<Board[]>> =>
  axios.get(`${BOARD_API}/get-boards`, { withCredentials: true });
