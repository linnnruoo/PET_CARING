import React, { Component } from "react";
import * as _ from "lodash";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Modal from "./Modal";

import { connect } from "react-redux";
import { updatePet, fetchPetsOfOwner } from "../../actions/petActions";
import DefaultButton from "../buttons/DefaultButton";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import TextField from "../textInputs/TextField";

// i'm lazy, lets do everything in one file
class EditPetModal extends Component {
  constructor() {
    super();
    this.state = {
      petSelected: "",
      name: "",
      breedname: "",
      typename: "",
      age: "",
      gender: ""
    };
    this._onChange = this._onChange.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
  }
  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _onSelectChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const prevPetInfo = _.find(this.props.pets.userPets, [
        "name",
        e.target.value
      ]);
      this.setState({
        ...this.state,
        ...prevPetInfo
      });
    });
  };
  _onUpdate = e => {
    e.preventDefault();

    const petInfo = {
      oldName: this.state.petSelected,
      newName: this.state.name,
      ownerId: this.props.auth.user.id,
      typeName: this.state.typename,
      breedName: this.state.breedname,
      age: this.state.age,
      gender: this.state.gender
    };

    this.props.onClose();
    this.props.updatePet(petInfo);
  };

  render() {
    const { onClose, open, pets } = this.props;
    const { name, breedname, typename, age, gender } = this.state;
    const allBreeds = _.groupBy(pets.breeds, "typename");
    const catBreeds = allBreeds["Cat"];
    const dogBreeds = allBreeds["Dog"];

    const breedsBySelectedType =
      typename === "Cat" ? catBreeds : typename === "Dog" ? dogBreeds : [];

    const renderPetInfoField = () => {
      return (
        <>
          <GridItem xs={12}>
            <TextField
              label="Name"
              value={name}
              name="name"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                variant="outlined"
                value={typename}
                onChange={this._onChange}
                inputProps={{
                  name: "typename"
                }}
                fullWidth
              >
                {pets.petTypes &&
                  pets.petTypes.map((type, index) => {
                    return (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Breed</InputLabel>
              <Select
                variant="outlined"
                value={breedname}
                onChange={this._onChange}
                inputProps={{
                  name: "breedname"
                }}
                disabled={_.isEmpty(allBreeds)}
              >
                {!_.isEmpty(breedsBySelectedType) &&
                  breedsBySelectedType.map((breed, index) => {
                    return (
                      <MenuItem key={index} value={breed.breedname}>
                        {breed.breedname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12}>
            <TextField
              label="Age"
              value={age}
              name="age"
              type="age"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={this._onChange}
            >
              <FormControlLabel
                value="F"
                control={<Radio color="primary" />}
                label="Female"
              />
              <FormControlLabel
                value="M"
                control={<Radio color="primary" />}
                label="Male"
              />
            </RadioGroup>
          </GridItem>
        </>
      );
    };

    return (
      <Modal label="Update a Pet" onClose={onClose} open={open} fullWidth>
        <GridContainer spacing={16}>
          <GridItem xs={12} />
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Selected Pet</InputLabel>
              <Select
                variant="outlined"
                value={this.state.petSelected}
                onChange={this._onSelectChange}
                inputProps={{
                  name: "petSelected"
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
          {!_.isEmpty(this.state.petSelected) ? renderPetInfoField() : null}
          <GridItem xs={12} align="right">
            <DefaultButton onClick={this._onUpdate}>Update</DefaultButton>
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
  { updatePet, fetchPetsOfOwner }
)(EditPetModal);
