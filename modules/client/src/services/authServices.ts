import axios, { type AxiosResponse } from 'axios';

import { RegisterPayload, LoginPayload } from '../store/ducks/user/types';
import type User from '../types/User';

const AUTH_API = `${process.env.API_URI}/auth`;

export const registerService = async (
  data: RegisterPayload,
): Promise<AxiosResponse<User>> =>
  axios.post(`${AUTH_API}/register`, data, { withCredentials: true });

export const loginService = async (
  data: LoginPayload,
): Promise<AxiosResponse<User>> =>
  axios.put(`${AUTH_API}/login`, data, { withCredentials: true });

export const autologinService = async (): Promise<AxiosResponse<User | null>> =>
  axios.get(`${AUTH_API}/autologin`, { withCredentials: true });
