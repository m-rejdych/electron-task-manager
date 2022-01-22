import React, { useEffect } from 'react';
import './index.css';

import Container from './components/Container';
import Board from './components/Board';

const App: React.FC = () => {
  useEffect(() => {
    fetch('http://localhost:8080/').then((res) => res.json()).then(data => console.log(data)).catch(err => console.log(err.message));
  }, []);

  return (
    <Container>
      <Board />
    </Container>
  );
};

export default App;
