import type { RefObject } from 'react';
import type Offsets from '../types/Offsets';

export const extractOffsets = (
  ref: RefObject<HTMLDivElement>,
): Offsets | null => {
  if (!ref.current) return null;

  const { offsetTop, offsetHeight, offsetWidth, offsetLeft } = ref.current;

  return { offsetTop, offsetHeight, offsetWidth, offsetLeft };
};

export const checkIsAboveCursor = (
  e: MouseEvent,
  ref: React.RefObject<HTMLDivElement>,
): boolean => {
  if (!ref.current) return false;

  return (
    e.clientX > ref.current.offsetLeft &&
    e.clientX < ref.current.offsetLeft + ref.current.offsetWidth &&
    e.clientY < ref.current.offsetTop + ref.current.offsetHeight / 2
  );
};
