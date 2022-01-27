import React, { type FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import RippleEffect from '../../components/RippleEffect';
import Input from '../../components/Input';
import type RootState from '../../store/types/RootState';
import { createBoard, getBoards } from '../../store/ducks/board/actions';

const Boards: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [value, setValue] = useState('');
  const boards = useSelector((state: RootState) => state.board.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const handleCreate = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!value.trim() || e.key !== 'Enter') return;

    dispatch(createBoard(value));
    e.currentTarget.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
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
      <ul className="flex flex-col items-start ml-4">
        {boards.map(({ name, id }) => (
          <Link key={`board-${id}`} to={id.toString()} className="hover:underline">
            {name}
          </Link>
        ))}
      </ul>
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
    </>
  );
};

export default Boards;
