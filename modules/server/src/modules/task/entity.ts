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
}

export default Task;
