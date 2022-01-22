import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

import User from '../user/entity';
import Task from '../task/entity';

@Entity()
class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user) => user.boards, { cascade: true })
  @JoinTable()
  users?: User[];

  @OneToMany(() => Task, task => task.board, { cascade: ['insert', 'update'] })
  tasks?: Task[];
}

export default Board;
