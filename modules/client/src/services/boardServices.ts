import axios from 'axios';

const BOARD_API = `${process.env.API_URI}/board` as const;

export const createBoardService = (name: string) =>
  axios.post(`${BOARD_API}/create-board`, { name }, { withCredentials: true });
