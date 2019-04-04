import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "../textInputs/TextField";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import DefaultButton from "../buttons/DefaultButton";

const NewPetForm = ({
  name,
  breedName,
  age,
  gender,
  _onTextFieldChange,
  _onCheckboxChange,
  _onSubmit
}) => {
  return (
    <form onSubmit={_onSubmit}>
      <GridContainer spacing={16}>
        <GridItem xs={12}>
          <TextField
            label="Name"
            value={name}
            name="name"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12}>
          <TextField
            label="Breed"
            value={breedName}
            name="breedName"
            type="breedName"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12}>
          <TextField
            label="Age"
            value={age}
            name="age"
            type="age"
            onChange={_onTextFieldChange}
          />
        </GridItem>
        <GridItem xs={12}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={gender}
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
          <DefaultButton type="submit">Create New</DefaultButton>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default NewPetForm;
