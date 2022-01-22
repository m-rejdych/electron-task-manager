import type { RefObject } from 'react';
import type Offsets from '../types/Offsets';
import type DragItem from '../types/DragItem';

interface SameColData {
  isSameCol: boolean;
  dragItem: DragItem;
}

export const extractOffsets = (
  ref: RefObject<HTMLDivElement>,
): Offsets | null => {
  if (!ref.current) return null;

  const { offsetTop, offsetHeight, offsetWidth, offsetLeft } = ref.current;

  return { offsetTop, offsetHeight, offsetWidth, offsetLeft };
};

export const checkIsInArea = (
  e: React.DragEvent,
  { offsetWidth, offsetLeft, offsetTop, offsetHeight }: Offsets,
): boolean =>
  e.clientX >= offsetLeft &&
  e.clientX <= offsetLeft + offsetWidth &&
  e.clientY >= offsetTop &&
  e.clientY <= offsetTop + offsetHeight;

export const checkIsBelowCursor = (
  e: MouseEvent,
  ref: React.RefObject<HTMLDivElement>,
  { isSameCol, dragItem }: SameColData,
): boolean => {
  if (!ref.current) return false;

  const {
    offsets: { offsetTop },
  } = dragItem;

  return (
    e.clientX > ref.current.offsetLeft &&
    e.clientX < ref.current.offsetLeft + ref.current.offsetWidth &&
    e.clientY < ref.current.offsetTop + ref.current.offsetHeight / 2 &&
    (!isSameCol || ref.current.offsetTop < offsetTop)
  );
};

export const checkIsAboveCursor = (
  e: MouseEvent,
  ref: RefObject<HTMLDivElement>,
  { isSameCol, dragItem }: SameColData,
): boolean => {
  if (!ref.current) return false;

  const {
    offsets: { offsetTop },
  } = dragItem;

  return (
    e.clientX > ref.current.offsetLeft &&
    e.clientX < ref.current.offsetLeft + ref.current.offsetWidth &&
    e.clientY > ref.current.offsetTop + ref.current.offsetHeight / 2 &&
    (!isSameCol || ref.current.offsetTop > offsetTop)
  );
};
