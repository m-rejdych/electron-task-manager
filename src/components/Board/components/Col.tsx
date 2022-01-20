import React, { Dispatch, SetStateAction } from 'react';

import type ItemType from '../types/Item';
import type Columns from '../types/Columns';
import Item from './Item';

interface Props {
  colName: keyof Columns;
  items: ItemType[];
  onUpdate: Dispatch<SetStateAction<Columns>>;
}

const Col: React.FC<Props> = ({ colName, items, onUpdate }) => {
  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleUpdate =
    (e: React.DragEvent, prevItemIndex?: number) =>
    (columns: Columns): Columns => {
      const itemColName = e.dataTransfer.getData('colName') as keyof Columns;
      const itemId = e.dataTransfer.getData('id');
      let isSameColumn = false;

      if (columns[colName].some(({ id }) => id === itemId)) {
        if (prevItemIndex || prevItemIndex === 0) prevItemIndex--;
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
          prevItemIndex || prevItemIndex === 0
            ? [
                ...currentColItems.slice(0, prevItemIndex + 1),
                item,
                ...currentColItems.slice(prevItemIndex + 1),
              ]
            : [...currentColItems, item],
      };
    };

  const handleDrop = (e: React.DragEvent, prevItemIndex?: number): void => {
    e.stopPropagation();

    onUpdate(handleUpdate(e, prevItemIndex));
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
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default Col;
