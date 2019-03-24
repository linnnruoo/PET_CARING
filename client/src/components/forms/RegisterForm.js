import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '../textInputs/TextField';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import DefaultButton from '../buttons/DefaultButton';

const RegisterForm = ({
  email,
  firstName,
  lastName,
  password,
  role,
  _onTextFieldChange,
  _onCheckboxChange,
  _onSubmit
}) => {
  return (
    <form onSubmit={_onSubmit}>
      <GridContainer spacing={16}>
        <GridItem xs={12} sm={6}>
          <TextField
            label='First Name'
            value={firstName}
            name="firstName"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12} sm={6}>
          <TextField
            label='Last Name'
            value={lastName}
            name="lastName"
            onChange={_onTextFieldChange}
          />
        </GridItem>
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
            type="password"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12}>
          <FormLabel component="legend">Choose your role</FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={role}
            onChange={_onCheckboxChange}
          >
            <FormControlLabel
              value="petowner"
              control={<Radio color="primary" />}
              label="Pet Owner"
            />
            <FormControlLabel
              value="caretaker"
              control={<Radio color="primary" />}
              label="Care Taker"
            />
          </RadioGroup>
        </GridItem>
        <GridItem xs={12} align="right">
          <DefaultButton type="submit">Submit</DefaultButton>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default RegisterForm;
