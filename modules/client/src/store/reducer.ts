import { combineReducers } from 'redux';

import userReducer from './ducks/user';
import boardReducer from './ducks/board';

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
});

export default rootReducer;
