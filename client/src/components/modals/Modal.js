import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import SVGIconButton from '../buttons/SVGIconButton';
import { CloseIcon } from '../../constants/icon_list';

const Modal = ({ classes, open, onClose, label, children, ...rest }) => {
  return (
    <Dialog
      aria-labelledby="modal"
      aria-describedby="modal"
      open={open}
      onClose={onClose}
      style={{zIndex: 10, maxHeight: 800}}
      {...rest}
    >
      <DialogTitle disableTypography className={classes.dialog_title}>
        <Typography style={{fontSize: '22px'}}>
          <strong>{label}</strong>
        </Typography>
        <SVGIconButton onClick={onClose} color="#000" pathName={CloseIcon} />
      </DialogTitle>
      <DialogContent className={classes.dialog_form}>
        { children }
      </DialogContent>
    </Dialog>
  );
}

const styles = () => ({
  dialog_form: {
    marginBottom: '20px'
  },
  dialog_title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default withStyles(styles)(Modal);
