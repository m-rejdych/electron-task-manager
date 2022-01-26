import { all } from 'redux-saga/effects';

import userSagas from './ducks/user/sagas';
import boardSagas from './ducks/board/sagas';

export default function* rootSaga() {
  yield all([...userSagas, ...boardSagas]);
}
