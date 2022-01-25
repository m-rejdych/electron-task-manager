import type User from '../../../types/User';

export interface State {
  user: User | null;
  loading: boolean; 
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  username: string;
}
