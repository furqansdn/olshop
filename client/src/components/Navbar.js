import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { logout } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  shopingCart: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);

  // let open;
  // if (currentUser) {
  //   open = Boolean(anchorEl);
  // }

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderShoppingCart = () => {
    if ((currentUser && currentUser.role !== 'admin') || !currentUser) {
      return (
        <IconButton className={classes.shopingCart} component={Link} to='/cart'>
          <Badge badgeContent={cartList.length} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.logo}
            component={Link}
            to='/'
            color='secondary'
          >
            MyShop
          </Typography>
          {renderShoppingCart()}
          {currentUser ? (
            <Button
              color='inherit'
              onClick={handleLogout}
              endIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          ) : (
            <Button
              color='secondary'
              variant='outlined'
              component={Link}
              to='/auth'
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
