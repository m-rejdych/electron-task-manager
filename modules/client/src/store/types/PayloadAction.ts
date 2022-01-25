import { Action } from 'redux';

export default interface PayloadAction<T = any, U = any> extends Action<T> {
  payload: U;
}
