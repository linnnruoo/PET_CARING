import React from "react";
import Modal from "./Modal";

import LoginContainer from "../../containers/LoginContainer";

export default ({ onClose, open }) => {
  return (
    <Modal label="Login" onClose={onClose} open={open}>
      <LoginContainer onClose={onClose} />
    </Modal>
  );
};
