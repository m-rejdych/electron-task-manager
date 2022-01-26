import createActionCreator from '../../util/createActionCreator';
import type Board from '../../../types/Board';

export const enum Actions {
  CreateBoard = 'CREATE_BOARD',
  SetBoard = 'SET_BOARD',
  SetError = 'SET_ERROR',
}

export const createBoard = createActionCreator<Actions.CreateBoard, string>(Actions.CreateBoard);

export const setBoard = createActionCreator<Actions.SetBoard, Board | null>(Actions.SetBoard);

export const setError = createActionCreator<Actions.SetError, string | null>(Actions.SetError);
