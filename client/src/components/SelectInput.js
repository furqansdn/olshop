import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: '50%',
  },
}));
const SelectInput = ({ value, onChange, name, id, options = [] }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor='input-select'>Grouping</InputLabel>
      <Select
        value={value ? value : ''}
        inputProps={{
          name: name,
          id: id,
        }}
        onChange={(event) => onChange(event.target.value)}
      >
        <MenuItem value={value}>
          <em>None</em>
        </MenuItem>
        {options.map((el, index) => (
          <MenuItem value={el._id} key={index}>
            {el.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
