import React from 'react';

const Container: React.FC = ({ children }) => {
  return (
    <div className="bg-slate-800 text-white h-full flex flex-col p-4">
      {children}
    </div>
  );
};

export default Container;
