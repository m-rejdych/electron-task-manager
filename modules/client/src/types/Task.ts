import Board from './Board';
import User from './User';
import ColumnType from './ColumnType';

export default interface Task {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  board?: Board;
  creator?: User;
  assignedTo?: User;
  column?: ColumnType;
}
