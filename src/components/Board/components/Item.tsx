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
import classes from '../styles.module';
import { extractOffsets, checkIsAboveCursor } from '../util/positionCheckers';

interface Props extends ItemType {
  index: number;
  colName: keyof Columns;
  dragTarget: DragTarget | null;
  onDragTargetUpdate: Dispatch<SetStateAction<DragTarget | null>>;
}

const Item: React.FC<Props> = ({
  index,
  colName,
  name,
  id,
  dragTarget,
  onDragTargetUpdate,
}) => {
  const [isDragItem, setIsDragItem] = useState(false);
  const [isDragTargetBelow, setIsDragTargetBelow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (!ref.current || !dragTarget || isDragItem) return;

      setIsDragTargetBelow(checkIsAboveCursor(e, ref));
    };

    if (dragTarget) {
      window.addEventListener('drag', listener);
    } else {
      setIsDragTargetBelow(false);
    }

    return () => {
      window.removeEventListener('drag', listener);
    };
  }, [dragTarget]);

  const handleDragStart = (e: React.DragEvent, id: string): void => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('colName', colName);
    setIsDragItem(true);
  };

  const handleDragEnd = (): void => {
    setIsDragItem(false);
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
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      className={`border border-gray-400 rounded-lg h-20 m-4 shadow shadow-black bg-slate-900 p-2 cursor-move cpu ${
        dragTarget ? 'transition-transform' : ''
      } ${isDragItem ? classes.hide : ''} 
      ${isDragTargetBelow ? 'translate-y-12' : ''}`}
    >
      {name}
    </div>
  );
};

export default Item;
