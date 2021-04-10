import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grow,
  CircularProgress,
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddShoppingCart, DeleteForever, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from '../actions/cartAction';
import parseRupiah from '../utils/parseRupiah';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    borderRadius: '15px',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: 'cover',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.down('sm')]: {
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Product = ({
  product,
  timeOut,
  isAuthenticated,
  buttonAction,
  handleDeleteProduct,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, currentId, cartList } = useSelector((state) => state.cart);

  const renderCartButton = (productId) => {
    if (loading && currentId === productId) {
      return <CircularProgress color='secondary' />;
    } else {
      return (
        <IconButton
          aria-label='Add to Cart'
          color='secondary'
          disabled={
            !isAuthenticated || cartList.some((el) => el.product === productId)
          }
          onClick={() => dispatch(addToCart(product._id))}
        >
          <AddShoppingCart />
        </IconButton>
      );
    }
  };
  return (
    <Grow
      in={!!product}
      style={{ transformOrigin: '0 0 0' }}
      {...(!!product ? { timeout: timeOut } : {})}
    >
      <Card className={classes.root}>
        <CardMedia
          className={classes.cardMedia}
          image={product.image}
          title={product.title}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography gutterBottom variant='h5' component='h2'>
              {product.title}
            </Typography>

            <Typography
              gutterBottom
              variant='subtitle1'
              component='h2'
              color='secondary'
              className={classes.contentPrice}
            >
              {`Rp. ${parseRupiah(product.price)}`}
            </Typography>
          </div>
          {product.description && (
            <Typography variant='body2' color='textSecondary' component='p'>
              {product.description}
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          {buttonAction === 'admin' ? (
            <>
              <IconButton
                color='secondary'
                aria-label='Delete Product'
                onClick={() => handleDeleteProduct(product._id)}
              >
                <DeleteForever />
              </IconButton>
              <IconButton
                color='primary'
                aria-label='Edit Product'
                component={Link}
                to={`/product/${product._id}`}
              >
                <Edit />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant='body2' color='textSecondary' component='p'>
                {/* {`Stok: ${product.stock}`} */}
                Tambah Keranjang
              </Typography>
              {renderCartButton(product._id)}
            </>
          )}
        </CardActions>
      </Card>
    </Grow>
  );
};

export default Product;
