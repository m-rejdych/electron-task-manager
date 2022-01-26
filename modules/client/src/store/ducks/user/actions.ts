import createActionCreator from '../../util/createActionCreator';
import type { RegisterPayload, LoginPayload } from './types';
import type User from '../../../types/User';

export const enum Actions {
  Register = 'REGISTER',
  Login = 'LOGIN',
  Autologin = 'AUTOLOGIN',
  SetUser = 'SET_USER',
  SetError = 'SET_ERROR',
}

export const register = createActionCreator<Actions.Register, RegisterPayload>(Actions.Register);

export const login = createActionCreator<Actions.Login, LoginPayload>(Actions.Login);

export const autologin = createActionCreator<Actions.Autologin, void>(Actions.Autologin);

export const setUser = createActionCreator<Actions.SetUser, User | null>(Actions.SetUser);

export const setError = createActionCreator<Actions.SetError, string | null>(Actions.SetError);
