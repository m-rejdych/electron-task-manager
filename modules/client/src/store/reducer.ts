import { combineReducers } from 'redux';

import userReducer from './ducks/user';
import boardReducer from './ducks/board';
import tasksReducer from './ducks/tasks/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  tasks: tasksReducer,
});

export default rootReducer;
