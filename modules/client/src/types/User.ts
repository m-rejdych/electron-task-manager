import type Board from './Board';

export default interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  boards?: Board[];
}
