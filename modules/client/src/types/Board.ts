import type User from './User';

export default interface Board {
  id: number;
  name: string;
  craetedAt: Date;
  updatedAt: Date;
  user?: User;
}
