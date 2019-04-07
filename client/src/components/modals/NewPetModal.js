import React from "react";
import Modal from "./Modal";
import NewPetContainer from "../../containers/NewPetContainer";

const NewPetModal = ({ onClose, open }) => {
  return (
    <Modal label="Add a New Pet" onClose={onClose} open={open}>
      <NewPetContainer onClose={onClose} />
    </Modal>
  );
};

export default NewPetModal;
