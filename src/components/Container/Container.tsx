import React from 'react';

const Container: React.FC = ({ children }) => {
  return (
    <div className="bg-slate-800 text-white min-h-screen flex flex-col p-4">
      {children}
    </div>
  );
};

export default Container;
