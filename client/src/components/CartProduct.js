import React from 'react';
import { Paper, Typography, IconButton, Grow } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import parseRupiah from '../utils/parseRupiah';

const useStyles = makeStyles((theme) => ({
  product: {
    display: 'flex',
    padding: theme.spacing(2),
  },
  cartProductImage: {
    width: '7rem',
    height: '7rem',
  },
  cartProductDetail: {
    marginLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    justifyContent: 'space-between',
  },
  cartActions: {
    alignSelf: 'flex-end',
    justifySelf: 'center',
    display: 'flex',
  },
  productQuantity: {
    marginLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
}));

const CartProduct = ({
  cartProduct,
  timeOut,
  handleRemoveCart,
  handleQuantity,
}) => {
  const classes = useStyles();

  const { loading } = useSelector((state) => state.cart);
  return (
    <Grow
      in={!!cartProduct}
      style={{ transformOrigin: '0 0 0' }}
      {...(!!cartProduct ? { timeout: timeOut } : {})}
    >
      <Paper style={{ marginBottom: '1rem' }}>
        <div className={classes.product}>
          <img
            src={cartProduct.image}
            alt={cartProduct.title}
            className={classes.cartProductImage}
          />
          <div className={classes.cartProductDetail}>
            <div>
              <Typography variant='h6' component='h6'>
                {cartProduct.title}
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                component='h6'
              >
                {`Rp.${parseRupiah(cartProduct.price)}`}
              </Typography>
            </div>

            <div className={classes.cartActions}>
              <IconButton
                color='secondary'
                aria-label='Delete Cart Product'
                component='button'
                onClick={() => handleRemoveCart(cartProduct.product)}
              >
                <DeleteForeverIcon />
              </IconButton>
              <div className={classes.productQuantity}>
                <IconButton
                  aria-label='Decrease Product'
                  component='button'
                  disabled={
                    cartProduct.quantity === 1 ? true : false || loading
                  }
                  onClick={() =>
                    handleQuantity(
                      cartProduct.product,
                      cartProduct.quantity - 1
                    )
                  }
                >
                  <IndeterminateCheckBoxRoundedIcon />
                </IconButton>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  component='h6'
                  style={{ margin: '0 1rem' }}
                >
                  {cartProduct.quantity}
                </Typography>
                <IconButton
                  aria-label='Increase Product'
                  component='button'
                  disabled={
                    cartProduct.stock === cartProduct.quantity
                      ? true
                      : false || loading
                  }
                  onClick={() =>
                    handleQuantity(
                      cartProduct.product,
                      cartProduct.quantity + 1
                    )
                  }
                >
                  <AddBoxRoundedIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </Grow>
  );
};

export default CartProduct;
