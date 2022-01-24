import { Reducer } from 'redux';
import type { State } from './types';
import type PayloadAction from '../../types/PayloadAction';

const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (
  state = initialState,
  { type },
) => {
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
