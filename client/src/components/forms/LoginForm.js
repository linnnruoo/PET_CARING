import React from 'react';
import TextField from '../textInputs/TextField';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import DefaultButton from '../buttons/DefaultButton';

const RegisterForm = ({
  email,
  password,
  _onTextFieldChange,
  _onSubmit
}) => {
  return (
    <form onClick={_onSubmit}>
      <GridContainer spacing={16}>
        <GridItem xs={12}>
          <TextField
            label='Email'
            value={email}
            name="email"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12}>
          <TextField
            label='Password'
            value={password}
            name="password"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12} align="right">
          <DefaultButton>Login</DefaultButton>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default RegisterForm;
