export const enum ColumnNames {
  NotStarted = 'notStarted',
  Doing = 'doing',
  Done = 'done',
}

export default interface ColumnType {
  id: number;
  name: ColumnNames; 
}
