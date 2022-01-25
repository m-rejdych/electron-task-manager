import { put, call, takeEvery } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import { setUser, setError, register, login, Actions } from './actions';
import { registerService, loginService } from '../../../services/authServices';
import type PayloadAction from '../../types/PayloadAction';
import type User from '../../../types/User';

function* handleRegister({ payload }: PayloadAction<ReturnType<typeof register>>) {
  try {
    const response: AxiosResponse<User> = yield call(registerService, payload);

    yield put(setUser(response.data));
 } catch (error: any) {
   yield put(setError(error.response.data.message));
 }
}

function* handleLogin({ payload }: ReturnType<typeof login>) {
  try {
    const response: AxiosResponse<User> = yield call(loginService, payload);

    yield put(setUser(response.data));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  }
}

function* setRegisterSaga() {
  yield takeEvery(Actions.Register, handleRegister);
}

function* setLoginSaga() {
  yield takeEvery(Actions.Login, handleLogin);
}

export default [setRegisterSaga(), setLoginSaga()];
