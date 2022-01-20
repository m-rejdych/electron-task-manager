import type Item from './Item';

export default interface Columns {
  notStarted: Item[];
  doing: Item[];
  done: Item[];
}
