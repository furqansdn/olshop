import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
  Badge,
} from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  shopingCart: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.title}
            component={Link}
            to='/'
            color='secondary'
          >
            MyShop
          </Typography>
          <IconButton className={classes.shopingCart}>
            <Badge badgeContent={4} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button color='secondary' variant='outlined'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
