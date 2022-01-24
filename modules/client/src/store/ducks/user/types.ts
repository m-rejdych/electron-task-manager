import type User from '../../../types/User';

export interface State {
  user: User | null;
  loading: boolean; 
  error: string | null;
}
