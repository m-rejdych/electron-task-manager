import React from 'react';

interface Props {
  colIndex: number;
  rowCount: number;
}

const GridCol: React.FC<Props> = ({ colIndex, rowCount }) => {
  return (
    <div className="flex-1 border border-r-black last:border-r-0">
      {Array.from({ length: rowCount }, (_, i) => (
        <div
          key={`grid-col-${colIndex}-row-${i}`}
          className="border border-b-black last:border-b-0 h-20"
        >
          1
        </div>
      ))}
    </div>
  );
};

export default GridCol;
