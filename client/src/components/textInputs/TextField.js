
import React from 'react';
import { TextField as CustomTextField, Typography } from '@material-ui/core';

const TextField = ({ classes, label, errorMsg, ...rest }) => {
  return (
    <>
      <CustomTextField
        required
        autoFocus
        fullWidth
        label={label}
        variant="outlined"
        margin="dense"
        InputProps={{shrink: 'true'}}
        {...rest}
      />
      {errorMsg && (<Typography variant="caption" color="error">{errorMsg}</Typography>)}
    </>
  );
};

export default TextField;
