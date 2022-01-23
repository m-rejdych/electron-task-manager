import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import Task from '../task/entity';
import ColumnType from '../columnType/entity';

@Entity()
class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, (task) => task.column, {
    cascade: ['insert', 'update'],
  })
  tasks?: Task[];

  @ManyToOne(() => ColumnType)
  type?: ColumnType;
}

export default ColumnEntity;
