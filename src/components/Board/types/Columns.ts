import type ItemType from './Item';

export default interface Columns {
  notStarted: ItemType[];
  doing: ItemType[];
  done: ItemType[];
}
