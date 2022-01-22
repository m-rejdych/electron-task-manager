import React from 'react';
import './index.css';

import Container from './components/Container';
import Board from './components/Board';

const App: React.FC = () => {
  console.log('Hello!');

  return (
    <Container>
      <Board />
    </Container>
  );
};

export default App;
