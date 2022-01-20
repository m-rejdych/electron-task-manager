import React from 'react';

import type Columns from '../types/Columns';
import type ItemType from '../types/Item';

interface Props extends ItemType {
  index: number;
  colName: keyof Columns;
  onDrop: (e: React.DragEvent, prevItemIndex?: number) => void;
}

const Item: React.FC<Props> = ({ index, colName, name, id, onDrop }) => {
  const handleDragStart = (e: React.DragEvent, id: string): void => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('colName', colName);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
      key={`grid-col-${colName}-item-${index}`}
      className="border border-gray-400 rounded-lg h-20 m-4 shadow shadow-black bg-slate-900 p-2"
    >
      {name}
    </div>
  );
};

export default Item;
