export interface Columns {
  notStarted: Item[];
  doing: Item[];
  done: Item[];
}

export interface Item {
  id: string;
  name: string;
}
