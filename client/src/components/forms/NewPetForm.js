import React from "react";
import * as _ from "lodash";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import TextField from "../textInputs/TextField";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import DefaultButton from "../buttons/DefaultButton";

const NewPetForm = ({
  pets,
  name,
  breedName,
  petType,
  age,
  gender,
  _onTextFieldChange,
  _onCheckboxChange,
  _onSubmit
}) => {
  const allBreeds = _.groupBy(pets.breeds, "typename");
  const catBreeds = allBreeds["Cat"];
  const dogBreeds = allBreeds["Dog"];

  const breedsBySelectedType =
    petType === "Cat" ? catBreeds : petType === "Dog" ? dogBreeds : [];

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
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              variant="outlined"
              value={petType}
              onChange={_onTextFieldChange}
              inputProps={{
                name: "petType"
              }}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
              value={breedName}
              onChange={_onTextFieldChange}
              inputProps={{
                name: "breedName"
              }}
              disabled={_.isEmpty(allBreeds)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
            type="number"
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
        <GridItem xs={12} align="right">
          <DefaultButton style={{ backgroundColor: "#8d9f87" }} type="submit">
            Create New
          </DefaultButton>
        </GridItem>
      </GridContainer>
    </form>
  );
};

export default NewPetForm;
