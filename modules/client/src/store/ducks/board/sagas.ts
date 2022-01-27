import { put, call, takeEvery } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { Actions, setBoard, setBoards, setError, createBoard } from './actions';
import { createBoardService, getBoardsService } from '../../../services/boardServices';
import type Board from '../../../types/Board';

function* handleCreateBoard({ payload }: ReturnType<typeof createBoard>) {
  try {
    const response: AxiosResponse<Board> = yield call(createBoardService, payload);

    yield put(setBoard(response.data));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  }
}

function* handleGetBoards() {
  try {
    const response: AxiosResponse<Board[]> = yield call(getBoardsService);

    yield put(setBoards(response.data));
 } catch (error: any) {
   yield put(setError(error.response.data.message));
 }
}

function* createBoardSaga() {
  yield takeEvery(Actions.CreateBoard, handleCreateBoard);
}

function* getBoardsSaga() {
  yield takeEvery(Actions.GetBoards, handleGetBoards);
}

export default [createBoardSaga(), getBoardsSaga()];
