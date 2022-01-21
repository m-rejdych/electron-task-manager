import React, { Dispatch, SetStateAction } from 'react';

import type ItemType from '../types/Item';
import type Columns from '../types/Columns';

interface Props {
  colName: keyof Columns;
  items: ItemType[];
  onUpdate: Dispatch<SetStateAction<Columns>>;
}

const GridCol: React.FC<Props> = ({ colName, items, onUpdate }) => {
  const handleDragStart = (e: React.DragEvent, id: string): void => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('colName', colName);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleUpdate =
    (e: React.DragEvent) =>
    (columns: Columns): Columns => {
      const itemColName = e.dataTransfer.getData('colName') as keyof Columns;
      const itemId = e.dataTransfer.getData('id');

      if (columns[colName].some(({ id }) => id === itemId)) {
        return columns;
      }

      const item = columns[itemColName].find(({ id }) => id === itemId);
      console.log(itemColName, itemId, item);
      if (!item) return columns;

      return {
        ...columns,
        [itemColName]: columns[itemColName].filter(({ id }) => id !== itemId),
        [colName]: [...columns[colName], item],
      };
    };

  const handleDrop = (e: React.DragEvent): void => {
    onUpdate(handleUpdate(e));
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex-1 border-r border-r-gray-400 last:border-r-0"
    >
      {items.map(({ name, id }, i) => (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, id)}
          key={`grid-col-${colName}-item-${i}`}
          className="border border-gray-400 rounded-lg h-20 m-4 shadow shadow-black bg-slate-900 p-2"
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default GridCol;
