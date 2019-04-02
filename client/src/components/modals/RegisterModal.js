import React from "react";
import Modal from "./Modal";

import RegisterContainer from "../../containers/RegisterContainer";

export default ({ onClose, open }) => {
  return (
    <Modal label="Register" onClose={onClose} open={open}>
      <RegisterContainer onClose={onClose} />
    </Modal>
  );
};
