import { all } from 'redux-saga/effects';

import userSagas from './ducks/user/sagas';

export default function* rootSaga() {
  yield all([...userSagas]);
}
