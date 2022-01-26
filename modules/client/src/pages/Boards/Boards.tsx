import React, { type FC } from 'react';

import RippleEffect from '../../components/RippleEffect';

const Boards: FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Your boards</h2>
        <RippleEffect>
          <button className="shadow rounded-md bg-rose-300 bg-opacity-40 px-4 py-2 hover:bg-opacity-30">
            Create board
          </button>
        </RippleEffect>
      </div>
    </div>
  );
};

export default Boards;
