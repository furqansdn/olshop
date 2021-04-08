import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Typography,
  Grid,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

import api from '../api';
import Product from './Product';
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
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const query = useQuery();
  const categoryId = query.get('categoryId');
  const catTitle = query.get('title');

  // const [error, setError] = useState(false);

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const fetchProduct = async (categoryId) => {
    let params = {};
    if (categoryId) {
      params.categoryId = categoryId;
    }

    const { data } = await api.get('/products', { params });

    if (data.status === 'success') {
      setProductList(data.data);
    }
  };

  const fetchCategory = async () => {
    const { data } = await api.get('/category');
    if (data.status === 'success') {
      setCategories(data.data.categories);
    }
  };
  useEffect(() => {
    fetchProduct(categoryId);
    fetchCategory();
  }, [categoryId]);

  const renderProduct = productList.map((el, index) => {
    const timeOut = index * 500;
    return (
      <Grid key={el._id} item xs={12} sm={6} md={4} lg={3}>
        <Product product={el} timeOut={timeOut} />
      </Grid>
    );
  });

  const renderFilterList = categories.map((el) => {
    return (
      <MenuItem
        key={el._id}
        component={Link}
        to={`/?categoryId=${el._id}&title=${el.title}`}
        onClick={handleClose}
      >
        {el.title}
      </MenuItem>
    );
  });

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
          onClick={handleFilter}
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
          onClose={handleClose}
        >
          {renderFilterList}
        </Menu>
      </div>

      <Divider variant='middle' className={classes.headingDivider} />
      <Grid container spacing={4}>
        {renderProduct}
      </Grid>
    </main>
  );
};

export default Products;
