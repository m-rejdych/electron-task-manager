import React from 'react';

import GridCol from './GridCol';

const ROW_COUNT = 5;
const COL_COUNT = 3;

const Grid: React.FC = () => {
  return (
    <div className="flex">
      {Array.from({ length: COL_COUNT }, (_, i) => (
        <GridCol key={`grid-col-${i}`} rowCount={ROW_COUNT} colIndex={i} />
      ))}
    </div>
  );
};

export default Grid;
