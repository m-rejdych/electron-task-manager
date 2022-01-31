import type { Reducer } from 'redux';

import type { State } from './types';
import { Actions } from './actions';
import type PayloadAction from '../../types/PayloadAction';

const initialState: State = {
  tasks: {
    notStarted: [],
    doing: [],
    done: [],
  },
  loading: false,
  error: null,
};

const reducer: Reducer<State, PayloadAction> = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case Actions.GetTasks:
    case Actions.CreateTask:
      return { ...state, loading: true };
    case Actions.SetTasks:
      return { ...state, loading: false, error: null, tasks: payload };
    case Actions.AddTask:
      return {
        ...state,
        loading: false,
        error: null,
        tasks: { ...state.tasks, [payload.type]: payload.task },
      };
    case Actions.SetError:
      return { ...state, loading: false, error: payload };
    case Actions.Reset:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
