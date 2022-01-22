import type ItemType from './Item';

export type ColNames = 'notStarted' | 'doing' | 'done';

type Columns = Record<ColNames, ItemType[]>;

export default Columns;
