import React, { useState } from 'react';

import GridCol from './GridCol';
import type { Columns } from '../types/gridTypes';

const Grid: React.FC = () => {
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

  return (
    <div className="flex">
      {Object.entries(columns).map(([name, items]) => (
        <GridCol
          key={`col-${name}`}
          colName={name as keyof Columns}
          items={items}
          onUpdate={setColumns}
        />
      ))}
    </div>
  );
};

export default Grid;
