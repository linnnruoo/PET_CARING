import React, { Component } from "react";
import axios from "axios";
import NewPetForm from "../components/forms/NewPetForm";
import { toast } from "react-toastify";

class NewPetContainer extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      breedName: "",
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
      breedName: this.state.breedName,
      age: this.state.age,
      gender: this.state.gender
    };
    axios
      .post("/api/pet", newPetInfo)
      .then(res => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <NewPetForm
        name={this.state.name}
        breedName={this.state.breedName}
        age={this.state.age}
        gender={this.state.gender}
        _onSubmit={this._onSubmit}
        _onTextFieldChange={this._onTextFieldChange}
        _onCheckboxChange={this._onCheckboxChange}
      />
    );
  }
}

export default NewPetContainer;
