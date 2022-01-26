import { Reducer } from 'redux';

import { Actions } from './actions';
import type { State } from './types';
import type PayloadAction from '../../types/PayloadAction';

const initialState: State = {
  board: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case Actions.CreateBoard:
      return { ...state, loading: true };
    case Actions.SetBoard:
      return { ...state, loading: false, error: null, board: payload };
    case Actions.SetError:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
