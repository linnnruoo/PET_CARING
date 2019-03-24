import React from 'react';
import Button from '@material-ui/core/Button';

const DefaultButton = ({ children, ...rest }) => {
  return (
    <Button variant="contained" size="large" color="primary" {...rest}>
    { children }
    </Button>
  )
}

export default DefaultButton;
