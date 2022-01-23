import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import Board from '../board/entity';
import Task from '../task/entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Board, (board) => board.users, {
    cascade: ['insert', 'update'],
  })
  boards?: Board[];

  @OneToMany(() => Task, (task) => task.assignedTo, {
    cascade: ['insert', 'update'],
  })
  assignedTasks?: Task[];
}

export default User;
