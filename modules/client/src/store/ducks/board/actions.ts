import createActionCreator from '../../util/createActionCreator';
import type Board from '../../../types/Board';

export const enum Actions {
  CreateBoard = 'CREATE_BOARD',
  GetBoards = 'GET_BOARDS',
  SetBoard = 'SET_BOARD',
  SetBoards = 'SET_BOARDS',
  SetError = 'SET_ERROR',
}

export const createBoard = createActionCreator<Actions.CreateBoard, string>(Actions.CreateBoard);

export const getBoards = createActionCreator<Actions.GetBoards, void>(Actions.GetBoards);

export const setBoard = createActionCreator<Actions.SetBoard, Board | null>(Actions.SetBoard);

export const setBoards = createActionCreator<Actions.SetBoards, Board[]>(Actions.SetBoards);

export const setError = createActionCreator<Actions.SetError, string | null>(Actions.SetError);
