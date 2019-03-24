import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from '../components/forms/LoginForm';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  _onSubmit = (e) => {
    e.preventDefault();
    const userAccInfo = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post('/api/user/login', userAccInfo)
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err))
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        _onTextFieldChange={this._onTextFieldChange}
        _onSubmit={this._onSubmit}
      />
    )
  } 
}

export default LoginContainer;
