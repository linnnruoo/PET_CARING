import React from 'react';
import Paper from '../paper/Paper';
import TextField from '../textInputs/TextField';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';

const RegisterForm = () => {
  return (
    <Paper>
      <GridContainer spacing={16}>
        <GridItem>
          <TextField label='First Name' />
        </GridItem>
        <GridItem>
          <TextField label='Last Name' />
        </GridItem>
      </GridContainer>
    </Paper>
  )
}

export default RegisterForm;
