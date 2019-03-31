import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from '../components/forms/RegisterForm';
import { toast } from 'react-toastify';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: ''
    }
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  _onCheckboxChange = (e) => {
    this.setState({
      role: e.target.value
    })
  }
  _onSubmit = (e) => {
    e.preventDefault();

    const registrationInfo = {
      email:      this.state.email,
      firstname:  this.state.firstName,
      lastname:   this.state.lastName,
      password:   this.state.password,
      role:       this.state.role
    }

    axios
      .post('/api/user/register', registrationInfo)
      .then(
        res => {
          toast.success(res.data.message);  
        }
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      <RegisterForm
        email={this.state.email}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        password={this.state.password}
        role={this.state.role}
        _onTextFieldChange={this._onTextFieldChange}
        _onCheckboxChange={this._onCheckboxChange}
        _onSubmit={this._onSubmit}
      />
    )
  } 
}

export default RegisterContainer;
