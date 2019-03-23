import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper as CustomPaper } from '@material-ui/core';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 2,
    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.1)',
    overflowX: 'auto'
  }
})

const Paper = ({ classes, children, ...rest }) => {
  return (
    <CustomPaper className={classes.paper} {...rest}>
      {children}
    </CustomPaper>
  );
}

export default withStyles(styles)(Paper);