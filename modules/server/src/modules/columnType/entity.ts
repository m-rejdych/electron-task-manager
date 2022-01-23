import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

enum ColumnName {
  NotStarted = 'notStarted',
  Doing = 'doing',
  Done = 'done',
}

@Entity()
class ColumnType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: ColumnName;
}

export default ColumnType;
