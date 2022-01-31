import Board from './Board';
import User from './User';
import Column from './Column';

export default interface Task {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  board?: Board;
  creator?: User;
  assignedTo?: User;
  column?: Column;
}
