import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Modal from "./Modal";

import { connect } from "react-redux";
import { deletePet, fetchPetsOfOwner } from "../../actions/petActions";
import DefaultButton from "../buttons/DefaultButton";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

// i'm lazy, lets do everything in one file
class DeletePetModal extends Component {
  constructor() {
    super();
    this.state = {
      petName: ""
    };
    this._onChange = this._onChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }
  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _onDelete = e => {
    e.preventDefault();
    const petToDelete = {
      name: this.state.petName,
      ownerId: this.props.auth.user.id
    };
    this.props.onClose();
    this.props.deletePet(petToDelete);
    this.props.fetchPetsOfOwner(petToDelete.ownerId);
  };

  render() {
    const { onClose, open, pets } = this.props;
    return (
      <Modal label="Delete a Pet" onClose={onClose} open={open} fullWidth>
        <GridContainer spacing={16}>
          <GridItem xs={12} />
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Name</InputLabel>
              <Select
                variant="outlined"
                value={this.state.petName}
                onChange={this._onChange}
                inputProps={{
                  name: "petName"
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {pets.userPets &&
                  pets.userPets.map((pet, index) => {
                    return (
                      <MenuItem key={index} value={pet.name}>
                        {pet.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} align="right">
            <DefaultButton
              onClick={this._onDelete}
              style={{ backgroundColor: "#696d7d" }}
            >
              Delete
            </DefaultButton>
          </GridItem>
        </GridContainer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pets: state.pets,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { deletePet, fetchPetsOfOwner }
)(DeletePetModal);
