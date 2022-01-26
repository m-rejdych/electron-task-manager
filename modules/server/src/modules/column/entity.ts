import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import ColumnType from '../columnType/entity';

@Entity()
class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColumnType)
  type?: ColumnType;
}

export default ColumnEntity;
