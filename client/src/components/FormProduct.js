import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from './Input';
import SelectInput from './SelectInput';
import { fetchCategories } from '../actions/categoryActions';
import {
  addProduct,
  getOneProduct,
  editProduct,
} from '../actions/productActions';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(2),
  },
  mainForm: {
    padding: '1rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },

  submit: {
    marginTop: theme.spacing(2),
  },

  productImage: {
    maxWidth: '50%',
    marginTop: theme.spacing(1),
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    borderRadius: '15px',
  },
}));

const defaultFormState = {
  title: '',
  category: '',
  price: '',
  stock: '',
  image: '',
};
const FormProduct = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState(defaultFormState);
  const { currentUser } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { error, loading, state } = useSelector((state) => state.productForm);
  const { product } = useSelector((state) => state.product);

  const onChangeNonFile = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onChangeFile = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };
  const onChangeCategorySelect = (value) => {
    setFormData({ ...formData, category: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (state === 'edit') {
      dispatch(editProduct(product._id, formData, history));
    } else {
      dispatch(addProduct(formData, history));
    }
  };

  useEffect(() => {
    if (!currentUser || (currentUser && currentUser.role !== 'admin')) {
      history.push('/');
    }

    if (id) {
      dispatch({ type: 'PRODUCT_FORM_ACCESS', payload: 'edit' });
      dispatch(getOneProduct(id));
    } else {
      dispatch({ type: 'PRODUCT_FORM_ACCESS', payload: 'add' });
    }

    if (state === 'edit') {
      setFormData((stateDt) => ({
        ...stateDt,
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock,
      }));
    }

    dispatch(fetchCategories());
  }, [
    currentUser,
    history,
    dispatch,
    id,
    product.title,
    product.category,
    product.price,
    product.stock,
    state,
  ]);

  const RenderProductImage = () => {
    if (state === 'edit' && product) {
      return (
        <Box boxShadow={3} className={classes.productImage}>
          <img
            src={product.image}
            alt={product.title}
            className={classes.image}
          ></img>
        </Box>
      );
    }
    return null;
  };

  return (
    <Container maxWidth='sm' className={classes.formContainer}>
      <Paper elevation={3} className={classes.mainForm}>
        <Typography variant='h6'>Tambah Product</Typography>
        {loading && <CircularProgress color='secondary' />}
        {error && <Typography variant='body2'>{error}</Typography>}
        <RenderProductImage />
        <form
          className={classes.form}
          encType='multipart/form-data'
          onSubmit={onSubmit}
        >
          <Grid container spacing={2}>
            <Input
              name='title'
              label='Nama Produk'
              type='text'
              value={formData.title}
              onChange={onChangeNonFile}
            />
            <SelectInput
              options={categories}
              value={formData.category}
              onChange={onChangeCategorySelect}
            />
            <Input
              name='price'
              label='Harga'
              type='number'
              value={formData.price}
              onChange={onChangeNonFile}
            />
            <Input
              name='stock'
              label='Stok'
              type='number'
              value={formData.stock}
              onChange={onChangeNonFile}
            />
            <Input
              name='image'
              type='file'
              onChange={onChangeFile}
              req={false}
            />
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FormProduct;
