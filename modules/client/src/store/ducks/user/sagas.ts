import { put, call, takeEvery } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';

import {
  setUser,
  setError,
  register,
  login,
  Actions,
} from './actions';
import { registerService, loginService, autologinService } from '../../../services/authServices';
import type User from '../../../types/User';

function* handleRegister({ payload }: ReturnType<typeof register>) {
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

function* handleAutologin() {
  try {
    const response: AxiosResponse<User | null> = yield call(autologinService);

    yield put(setUser(response.data));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  }
}

function* registerSaga() {
  yield takeEvery(Actions.Register, handleRegister);
}

function* loginSaga() {
  yield takeEvery(Actions.Login, handleLogin);
}

function* autologinSaga() {
  yield takeEvery(Actions.Autologin, handleAutologin);
}

export default [registerSaga(), loginSaga(), autologinSaga()];
