import type ColumnType from './ColumnType';

export default interface Column {
  id: number;
  type?: ColumnType;
}
