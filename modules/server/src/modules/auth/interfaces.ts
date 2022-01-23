import type User from '../user/entity';

export interface RegisterService {
  jwt: string;
  user: User;
}
