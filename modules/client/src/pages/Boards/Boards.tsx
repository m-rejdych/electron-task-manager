import React, { type FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import RippleEffect from '../../components/RippleEffect';
import Input from '../../components/Input';
import { createBoard } from '../../store/ducks/board/actions';

const Boards: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleCreate = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!value.trim() || e.key !== 'Enter') return;

    dispatch(createBoard(value));
    e.currentTarget.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Your boards</h2>
        <RippleEffect>
          <button
            className="shadow rounded-md bg-rose-300 bg-opacity-40 px-4 py-2 hover:bg-opacity-30"
            onClick={() => setIsCreating(true)}
          >
            Create board
          </button>
        </RippleEffect>
      </div>
      {isCreating && (
        <Input
          containerProps={{ className: 'mt-4 w-full' }}
          inputProps={{
            className: 'w-full',
            placeholder: 'Board name',
            autoFocus: true,
            onBlur: () => setIsCreating(false),
            onChange: handleChange,
            onKeyPress: handleCreate,
          }}
        />
      )}
    </div>
  );
};

export default Boards;
