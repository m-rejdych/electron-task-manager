import React, { type FC } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Board from '../../pages/Board';
import Boards from '../../pages/Boards';
import Auth from '../../pages/Auth';
import RouteTypes from '../../types/Routes';
import type RootState from '../../store/types/RootState';

const RoutesComponent: FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);

  return userId ? (
    <Routes>
      <Route path={RouteTypes.Boards} element={<Boards />}>
        <Route path=":id" element={<Board />} />
      </Route>
      <Route path="*" element={<Navigate to={RouteTypes.Boards} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path={RouteTypes.Login} element={<Auth />} />
      <Route path={RouteTypes.Register} element={<Auth />} />
      <Route path="*" element={<Navigate to={RouteTypes.Register} />} />
    </Routes>
  );
};

export default RoutesComponent;
