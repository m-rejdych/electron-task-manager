import React, { Dispatch, SetStateAction } from 'react';

import type ItemType from '../types/Item';
import type Columns from '../types/Columns';
import type DragTarget from '../types/DragTarget';
import Item from './Item';

const getIndex = (
  e: React.DragEvent,
  target: DragTarget | null,
): number | null => {
  if (!target) return null;

  const { offsets, index } = target;
  const { offsetTop, offsetHeight } = offsets;

  return e.clientY >= offsetTop + offsetHeight / 2 ? index : index - 1;
};

interface Props {
  colName: keyof Columns;
  items: ItemType[];
  onUpdate: Dispatch<SetStateAction<Columns>>;
  dragTarget: DragTarget | null;
  onDragTargetUpdate: Dispatch<SetStateAction<DragTarget | null>>;
}

const Col: React.FC<Props> = ({
  colName,
  items,
  onUpdate,
  dragTarget,
  onDragTargetUpdate,
}) => {
  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleUpdate =
    (e: React.DragEvent) =>
    (columns: Columns): Columns => {
      const itemColName = e.dataTransfer.getData('colName') as keyof Columns;
      const itemId = e.dataTransfer.getData('id');
      let isSameColumn = false;
      let index = getIndex(e, dragTarget);

      if (columns[colName].some(({ id }) => id === itemId)) {
        if (index || index === 0) index--;
        isSameColumn = true;
      }

      const item = columns[itemColName].find(({ id }) => id === itemId);
      if (!item) return columns;

      const currentColItems = isSameColumn
        ? columns[colName].filter(({ id }) => id !== itemId)
        : columns[colName];

      return {
        ...columns,
        ...(!isSameColumn && {
          [itemColName]: columns[itemColName].filter(({ id }) => id !== itemId),
        }),
        [colName]:
          index || index === 0
            ? [
                ...currentColItems.slice(0, index + 1),
                item,
                ...currentColItems.slice(index + 1),
              ]
            : [...currentColItems, item],
      };
    };

  const handleDrop = (e: React.DragEvent): void => {
    onUpdate(handleUpdate(e));
    onDragTargetUpdate(null);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex-1 border-r border-r-gray-400 last:border-r-0 h-full"
    >
      {items.map((item, i) => (
        <Item
          {...item}
          key={`grid-col-${colName}-item-${i}`}
          index={i}
          colName={colName}
          dragTarget={dragTarget}
          onDragTargetUpdate={onDragTargetUpdate}
        />
      ))}
    </div>
  );
};

export default Col;
