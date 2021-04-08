import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grow,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
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

const Product = ({ product, timeOut }) => {
  const classes = useStyles();
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
              {`Rp ${product.price}`}
            </Typography>
          </div>
          {product.description && (
            <Typography variant='body2' color='textSecondary' component='p'>
              Description
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label='Add to Cart'>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default Product;
