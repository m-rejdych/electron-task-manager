import React, { useState } from 'react';

import Col from './components/Col';
import type Columns from './types/Columns';
import type DragTarget from './types/DragTarget';
import type DragItem from './types/DragItem';

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({
    notStarted: [
      { id: 'id-1', name: 'Item 1' },
      { id: 'id-4', name: 'Item 4' },
    ],
    doing: [
      { id: 'id-2', name: 'Item 2' },
      { id: 'id-5', name: 'Item 5' },
    ],
    done: [
      { id: 'id-3', name: 'Item 3' },
      { id: 'id-6', name: 'Item 6' },
    ],
  });
  const [dragTarget, setDragTarget] = useState<null | DragTarget>(null);
  const [dragItem, setDragItem] = useState<null | DragItem>(null);

  return (
    <div className="flex flex-1 h-[calc(100vh-2rem)]">
      {Object.entries(columns).map(([name, items]) => (
        <Col
          key={`col-${name}`}
          colName={name as keyof Columns}
          items={items}
          onUpdate={setColumns}
          dragTarget={dragTarget}
          dragItem={dragItem}
          onDragTargetUpdate={setDragTarget}
          onDragItemUpdate={setDragItem}
        />
      ))}
    </div>
  );
};

export default Board;
