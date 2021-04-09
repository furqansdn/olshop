import React from 'react';
import { Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Auth from './components/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth='lg'>
        <Switch>
          <Route path='/' exact component={Products} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/Auth' exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
