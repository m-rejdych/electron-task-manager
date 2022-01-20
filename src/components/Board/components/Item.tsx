import React, { useRef } from 'react';

import type Columns from '../types/Columns';
import type ItemType from '../types/Item';

interface Props extends ItemType {
  index: number;
  colName: keyof Columns;
  onDrop: (e: React.DragEvent, prevItemIndex?: number) => void;
}

const Item: React.FC<Props> = ({ index, colName, name, id, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, id: string): void => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('colName', colName);
  };

  const handleDragOver = (e: React.DragEvent): void => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent): void => {
    const isAbove =
      !ref.current ||
      e.clientY >= ref.current.offsetTop + ref.current.offsetHeight / 2;

    onDrop(e, isAbove ? index : index - 1);
  };

  return (
    <div
      draggable
      ref={ref}
      onDragStart={(e) => handleDragStart(e, id)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="border border-gray-400 rounded-lg h-20 m-4 shadow shadow-black bg-slate-900 p-2"
    >
      {name}
    </div>
  );
};

export default Item;
