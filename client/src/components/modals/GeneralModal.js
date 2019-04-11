// display a one line message and a button for firing event
import React from 'react';
import Modal from './Modal';
import { Typography } from '@material-ui/core';
import DefaultButton from '../buttons/DefaultButton';

const GeneralModal = ({ onClose, open, onClick, label, message, buttonTitle }) => {
  return (
    <Modal label={label} onClose={onClose} open={open}>
      <Typography>{message}</Typography>
      <DefaultButton onClick={onClick}>{buttonTitle}</DefaultButton>
    </Modal>
  )
}

export default GeneralModal;
