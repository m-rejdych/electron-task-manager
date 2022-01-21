import Columns from './Columns';

export default interface DragItem {
  id: string;
  colName: keyof Columns;
}
