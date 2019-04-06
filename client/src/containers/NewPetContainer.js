import React, { Component } from "react";
import NewPetForm from "../components/forms/NewPetForm";
import { createNewPet } from "../actions/petActions";
import { connect } from "react-redux";

class NewPetContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      breedName: "",
      petType: "",
      age: undefined,
      gender: ""
    };
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onTextFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _onCheckboxChange = e => {
    this.setState({
      gender: e.target.value
    });
  };
  _onSubmit = e => {
    e.preventDefault();
    const newPetInfo = {
      name: this.state.name,
      ownerId: this.props.auth.user.id,
      breedName: this.state.breedName,
      typeName: this.state.petType,
      age: this.state.age,
      gender: this.state.gender
    };
    this.props.createNewPet(newPetInfo);
  };
  render() {
    return (
      <NewPetForm
        pets={this.props.pets}
        name={this.state.name}
        breedName={this.state.breedName}
        petType={this.state.petType}
        age={this.state.age}
        gender={this.state.gender}
        _onSubmit={this._onSubmit}
        _onTextFieldChange={this._onTextFieldChange}
        _onCheckboxChange={this._onCheckboxChange}
      />
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
  { createNewPet }
)(NewPetContainer);
