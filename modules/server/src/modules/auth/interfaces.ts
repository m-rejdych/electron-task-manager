import type User from '../user/entity';

export interface AuthService {
  jwt: string;
  user: User;
}
