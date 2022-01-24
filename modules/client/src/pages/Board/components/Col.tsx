import React, { useState, Dispatch, SetStateAction } from 'react';

import { checkIsInArea } from '../util/positionCheckers';
import type ItemType from '../types/Item';
import type Columns from '../types/Columns';
import type DragTarget from '../types/DragTarget';
import type DragItem from '../types/DragItem';
import RippleEffect from '../../../components/RippleEffect';
import Item from './Item';
import NewItemInput from './NewItemInput';

const getIndex = (
  e: React.DragEvent,
  target: DragTarget | null,
): number | null => {
  if (!target) return null;

  const { offsets, index } = target;
  const { offsetTop, offsetHeight } = offsets;

  return e.clientY >= (offsetTop + offsetHeight / 2 || !index)
    ? index
    : index - 1;
};

interface Props {
  colName: keyof Columns;
  items: ItemType[];
  onUpdate: Dispatch<SetStateAction<Columns>>;
  dragTarget: DragTarget | null;
  onDragTargetUpdate: Dispatch<SetStateAction<DragTarget | null>>;
  dragItem: DragItem | null;
  onDragItemUpdate: Dispatch<SetStateAction<DragItem | null>>;
}

const Col: React.FC<Props> = ({
  colName,
  items,
  onUpdate,
  dragTarget,
  dragItem,
  onDragTargetUpdate,
  onDragItemUpdate,
}) => {
  const [isAdding, setIsAdding] = useState(false);

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

      const itemIndex = columns[itemColName].findIndex(
        ({ id }) => itemId === id,
      );
      if (itemIndex === -1 || checkIsInArea(e, dragItem!.offsets))
        return columns;

      const item = columns[itemColName][itemIndex];

      if (columns[colName].some(({ id }) => id === itemId)) {
        isSameColumn = true;
        if (index && index > itemIndex) index--;
      }

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
    onDragItemUpdate(null);
  };

  const handleCraete = (value: string): void => {
    if (!value.trim()) return;

    onUpdate((prev) => ({
      ...prev,
      [colName]: [
        ...prev[colName],
        { id: Math.random().toString(), name: value },
      ],
    }));
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="flex-1 flex flex-col border-r border-r-gray-400 last:border-r-0 h-full overflow-hidden"
    >
      {items.map((item, i) => (
        <Item
          {...item}
          key={`grid-col-${colName}-item-${i}`}
          index={i}
          colName={colName}
          dragTarget={dragTarget}
          dragItem={dragItem}
          onDragTargetUpdate={onDragTargetUpdate}
          onDragItemUpdate={onDragItemUpdate}
        />
      ))}
      <div className="mx-4 my-2">
        {!isAdding ? (
          <RippleEffect>
            <button
              className="w-full rounded-md bg-gray-100 bg-opacity-10 py-1 text-3xl text-gray-400 shadow hover:bg-opacity-20"
              onClick={() => setIsAdding(true)}
            >
              +
            </button>
          </RippleEffect>
        ) : (
          <NewItemInput
            onBlur={() => setIsAdding(false)}
            onCreate={handleCraete}
          />
        )}
      </div>
    </div>
  );
};

export default Col;
