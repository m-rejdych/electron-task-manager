import { Action } from 'redux';

export default interface PayloadAction<T = unknown, U = unknown> extends Action<T> {
  payload: U;
}
