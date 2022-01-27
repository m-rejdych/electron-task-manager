import { Reducer } from 'redux';

import { Actions } from './actions';
import type { State } from './types';
import type PayloadAction from '../../types/PayloadAction';

const initialState: State = {
  boards: [],
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case Actions.CreateBoard:
    case Actions.GetBoards:
      return { ...state, loading: true };
    case Actions.SetBoard:
      return { ...state, loading: false, error: null, boards: [...state.boards, payload] };
    case Actions.SetBoards:
      return { ...state, loading: false, error: null, boards: payload };
    case Actions.SetError:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
