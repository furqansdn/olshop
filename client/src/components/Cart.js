import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const Cart = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={8}>
        <Paper elevation={3} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation={3} />
      </Grid>
    </Grid>
  );
};

export default Cart;
