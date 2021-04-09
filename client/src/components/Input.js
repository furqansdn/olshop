import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, onChange, type, label, showPassword, value }) => {
  return (
    <Grid item xs={12} sm={12} lg={12}>
      <TextField
        name={name}
        fullWidth
        onChange={onChange}
        variant='outlined'
        label={label}
        required
        value={value}
        type={type}
        InputProps={
          name.includes('password')
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={showPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      ></TextField>
    </Grid>
  );
};

export default Input;
