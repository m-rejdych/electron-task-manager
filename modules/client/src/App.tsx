import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './index.css';

import Container from './layout/Container';
import Board from './pages/Board';
import store from './store';

const App: React.FC = () => {
  useEffect(() => {
    fetch('http://localhost:8080/')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <Board />
      </Container>
    </Provider>
  );
};

export default App;
