import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import type Columns from '../types/Columns';
import type ItemType from '../types/Item';
import type DragTarget from '../types/DragTarget';
import type DragItem from '../types/DragItem';
import classes from '../styles.module';
import {
  extractOffsets,
  checkIsBelowCursor,
  checkIsAboveCursor,
} from '../util/positionCheckers';

interface Props extends ItemType {
  index: number;
  colName: keyof Columns;
  dragTarget: DragTarget | null;
  onDragTargetUpdate: Dispatch<SetStateAction<DragTarget | null>>;
  dragItem: DragItem | null;
  onDragItemUpdate: Dispatch<SetStateAction<DragItem | null>>;
}

const Item: React.FC<Props> = ({
  index,
  colName,
  name,
  id,
  dragTarget,
  dragItem,
  onDragTargetUpdate,
  onDragItemUpdate,
}) => {
  const [isDragTargetBelow, setIsDragTargetBelow] = useState(false);
  const [isDragTargetAbove, setIsDragTargetAbove] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isDragItem = dragItem?.id === id;

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!ref.current || !dragTarget || isDragItem || !dragItem) return;

      const {
        offsets: { offsetLeft, offsetWidth },
      } = dragItem;

      const isSameCol =
        offsetLeft === ref.current.offsetLeft && offsetWidth === offsetWidth;
      const isBelow = checkIsBelowCursor(e, ref, { isSameCol, dragItem });

      setIsDragTargetBelow(isBelow);

      if (isSameCol && !isBelow) {
        setIsDragTargetAbove(
          checkIsAboveCursor(e, ref, { isSameCol, dragItem }),
        );
      }
    };

    if (dragTarget) {
      window.addEventListener('drag', listener);
    } else {
      setIsDragTargetBelow(false);
      setIsDragTargetAbove(false);
    }

    return () => {
      window.removeEventListener('drag', listener);
    };
  }, [dragTarget]);

  const handleDragStart = (e: React.DragEvent, id: string): void => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('colName', colName);
    onDragItemUpdate({ index, offsets: extractOffsets(ref)!, id });
  };

  const handleDragEnter = (): void => {
    if (isDragItem) return;
    if (!ref.current) return;
    onDragTargetUpdate({ index, offsets: extractOffsets(ref)! });
  };

  return (
    <div
      draggable
      ref={ref}
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnter={handleDragEnter}
      className={`border border-gray-400 rounded-lg h-20 m-4 shadow shadow-black bg-slate-900 p-2 cursor-move cpu${
        dragTarget ? ' transition-transform' : ''
      }${isDragItem ? ` ${classes.hide}` : ''}
      ${isDragTargetBelow ? ' translate-y-12' : ''} ${
        isDragTargetAbove ? ' -translate-y-12' : ''
      }`}
    >
      {name}
    </div>
  );
};

export default Item;
