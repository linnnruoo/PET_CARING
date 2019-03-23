import React, { Component } from 'react';

import GridContainer from '../components/grid/GridContainer';
import GridItem from '../components/grid/GridContainer';
import RegisterForm from '../components/forms/RegisterForm';

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
  }
  _onTextFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <GridContainer direction="row" justify="center" alignItems="center" spacing={16}>
          <GridItem xs={12} sm={6}>
            <RegisterForm />
          </GridItem>
        </GridContainer>
      </div>
    )
  } 
}

export default RegisterContainer;
