import { combineReducers } from 'redux';

import userReducer from './ducks/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
