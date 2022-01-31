import React, { type FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Col from './components/Col';
import Routes from '../../types/Routes';
import type Columns from './types/Columns';
import type DragTarget from './types/DragTarget';
import type DragItem from './types/DragItem';
import type RootState from '../../store/types/RootState';
import { reset, getTasks } from '../../store/ducks/tasks/actions';

const Board: FC = () => {
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const board = useSelector((state: RootState) =>
    id
      ? state.board.boards.find(({ id: boardId }) => boardId === parseInt(id))
      : null,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(parseInt(id as string)));

  return () => {
    dispatch(reset());
  }
  }, [id]);

  const handleGoBack = (): void => {
    navigate(Routes.Boards);
  };

  return board ? (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl mb-4 mt-2">{board.name}</h2>
        <button className="hover:underline" onClick={handleGoBack}>
          All boards
        </button>
      </div>
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
    </>
  ) : null;
};

export default Board;
