import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Paper,
  Button,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import Input from './Input';
import { login, register } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  mainLogin: {
    marginTop: theme.spacing(2),
  },

  paperContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));

const initialize = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Auth = ({ history }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState(initialize);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { currentUser } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setFormState(initialize);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(formState, history));
    } else {
      dispatch(register(formState, history));
    }
    clearForm();
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const changeMethod = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {}, [currentUser, history]);
  return (
    <Container component='main' maxWidth='sm' className={classes.mainLogin}>
      <Paper elevation={3} className={classes.paperContent}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant='h5' color='textSecondary' component='h5'>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>

        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {!isLogin && (
              <Input
                onChange={onChange}
                name='name'
                type='text'
                label='Full Name'
                value={formState.name}
              />
            )}
            <Input
              type='email'
              onChange={onChange}
              label='Email'
              name='email'
              value={formState.email}
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              onChange={onChange}
              label='Password'
              name='password'
              showPassword={handleShowPassword}
              value={formState.password}
            />
            {!isLogin && (
              <Input
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
                label='Password Confirmation'
                name='passwordConfirm'
                showPassword={handleShowPassword}
                value={formState.passwordConfirm}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
      <Grid container justify='flex-end' style={{ marginTop: '1rem' }}>
        <Grid item>
          <Button onClick={changeMethod}>
            {isLogin ? 'Belum Punya akun? Daftar' : 'Sudah Punya Akun? Masuk'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Auth;
