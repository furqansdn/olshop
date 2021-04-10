import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CartProduct from './CartProduct';
import parseRupiah from '../utils/parseRupiah';
import { deleteFromCart, addToCart } from '../actions/cartAction';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(3),
  },
  totalCart: {
    padding: theme.spacing(3),
  },
  countCart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveCart = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleQuantity = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const renderProductCart = () => {
    if (cartList.length > 0) {
      return (
        <>
          <Button component={Link} to='/' color='secondary'>
            Tambah Barang Lagi
          </Button>

          {cartList.map((element, index) => (
            <CartProduct
              cartProduct={element}
              key={element.product}
              timeOut={index * 300}
              handleRemoveCart={handleRemoveCart}
              handleQuantity={handleQuantity}
            />
          ))}
        </>
      );
    } else {
      return (
        <Button component={Link} to='/'>
          Tidak Ada Barang Belanjaan! Kembali
        </Button>
      );
    }
  };

  const hargaTotal = cartList.reduce(
    (acc, element) => acc + element.price * element.quantity,
    0
  );
  return (
    <Grid container className={classes.main} spacing={2}>
      <Grid item xs={12} lg={8}>
        {renderProductCart()}
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation={3} className={classes.totalCart}>
          <Typography variant='h6'>Ringkasan Belanja</Typography>
          <div className={classes.countCart}>
            <Typography variant='body2' color='textSecondary' component='p'>
              Total Belanja
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {`Rp. ${parseRupiah(hargaTotal)}`}
            </Typography>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cart;
