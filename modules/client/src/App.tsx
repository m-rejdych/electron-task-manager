import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import store from './store';
import Container from './layout/Container';
import Routes from './layout/Routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Routes />
        </Container>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
