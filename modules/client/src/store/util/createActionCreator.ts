import type PayloadAction from '../types/PayloadAction';

type ActionCreator<T, U> = (payload: U) => PayloadAction<T, U>;

type CreateActionCreator = <T, U>(type: T) => ActionCreator<T, U>;

const createActionCreator: CreateActionCreator = (type) => (payload) => ({
  type,
  payload,
});

export default createActionCreator;
