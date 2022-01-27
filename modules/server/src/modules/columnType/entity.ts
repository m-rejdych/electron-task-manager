import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import type { ColumnName } from './types';

@Entity()
class ColumnType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: ColumnName;
}

export default ColumnType;
