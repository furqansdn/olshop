import React from 'react';
import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Products from './components/Products';
const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='lg'>
        <Switch>
          <Route path='/' exact component={Products} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
