import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Typography,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

import Product from './Product';
import { listProducts, deleteProduct } from '../actions/productActions';
import { fetchCategories } from '../actions/categoryActions';

const useStyles = makeStyles((theme) => ({
  mainApp: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },

  productListTitle: {
    fontSize: '2rem',
  },

  productListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  headingDivider: { margin: '1.5rem auto', width: '100%', marginTop: '0.5rem' },

  productAdd: {
    marginBottom: '1rem',
    flexGrow: 1,
    justifyContent: 'flex-end',
    display: 'flex',
  },
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const query = useQuery();
  const categoryId = query.get('categoryId');
  const catTitle = query.get('title');

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const { categories } = useSelector((state) => state.categories);
  const { currentUser } = useSelector((state) => state.auth);

  // const [error, setError] = useState(false);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(listProducts(categoryId));
    dispatch(fetchCategories());
  }, [categoryId, dispatch]);

  const renderFilterList = categories.map((el) => {
    return (
      <MenuItem
        key={el._id}
        component={Link}
        to={`/?categoryId=${el._id}&title=${el.title}`}
        onClick={() => setAnchorEl(null)}
      >
        {el.title}
      </MenuItem>
    );
  });

  const RenderAddProductButton = () => {
    if (currentUser && currentUser.role === 'admin') {
      return (
        <div className={classes.productAdd}>
          <Button
            color='primary'
            component={Link}
            to='/product'
            variant='outlined'
          >
            Tambah Product
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <main className={classes.mainApp}>
      <div className={classes.productListHeader}>
        <Typography
          variant='h2'
          className={classes.productListTitle}
          align='center'
        >
          {catTitle ? catTitle : 'All Product'}
        </Typography>

        <IconButton
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='secondary'
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <FilterListIcon />
        </IconButton>

        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          {renderFilterList}
        </Menu>
      </div>

      <Divider variant='middle' className={classes.headingDivider} />
      <RenderAddProductButton />

      {loading ? (
        <CircularProgress color='secondary' />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((el, index) => {
            const timeOut = index * 500;
            return (
              <Grid key={el._id} item xs={12} sm={6} md={4} lg={3}>
                <Product
                  product={el}
                  timeOut={timeOut}
                  isAuthenticated={!!currentUser}
                  buttonAction={currentUser ? currentUser.role : ''}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </main>
  );
};

export default Products;
