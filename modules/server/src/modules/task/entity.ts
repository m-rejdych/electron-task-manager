import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import Board from '../board/entity';
import User from '../user/entity';
import ColumnEntity from '../column/entity';

@Entity()
class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.tasks, { cascade: true })
  board?: Board;

  @ManyToOne(() => User, { cascade: true })
  creator?: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { cascade: true })
  assignedTo?: User;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, { cascade: true })
  column?: ColumnEntity;
}

export default Task;
