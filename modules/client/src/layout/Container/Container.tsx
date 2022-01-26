import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { autologin } from '../../store/ducks/user/actions';

const Container: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autologin());
  }, []);

  return (
    <div className="bg-slate-800 text-white min-h-screen flex flex-col p-4">
      {children}
    </div>
  );
};

export default Container;
