import { Reducer } from 'redux';

import type { State } from './types';
import type PayloadAction from '../../types/PayloadAction';
import { Actions } from './actions';

const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case Actions.Register:
    case Actions.Login:
    case Actions.Autologin:
      return { ...state, loading: true };
    case Actions.SetUser:
      return { ...state, loading: false, error: null, user: payload };
    case Actions.SetError:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default reducer;
