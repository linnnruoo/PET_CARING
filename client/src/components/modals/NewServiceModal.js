import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewService } from "../../actions/serviceAction";

import Modal from "./Modal";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import TextField from "../textInputs/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import DefaultButton from "../buttons/DefaultButton";
import TimePicker from "../pickers/TimePicker";

class NewServiceModal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      expected: "",
      startTime: "",
      endTime: "",
      typeName: ""
    };
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _onSubmit = e => {
    e.preventDefault();
    const serviceInfo = {
      id: this.props.auth.user.id,
      title: this.state.title,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      expected: this.state.expected,
      typeName: this.state.typeName
    };
    this.props.createNewService(serviceInfo);
    this.props.onClose();
  };

  render() {
    const { title, expected, startTime, endTime, typeName } = this.state;
    const { pets } = this.props;

    return (
      <Modal
        label="Add a New Service"
        onClose={this.props.onClose}
        open={this.props.open}
      >
        <GridContainer spacing={16}>
          <GridItem xs={12} />
          <GridItem xs={12}>
            <TextField
              label="Title"
              value={title}
              name="title"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12}>
            <TextField
              label="Expected Amount $"
              value={expected}
              name="expected"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                variant="outlined"
                value={typeName}
                onChange={this._onChange}
                inputProps={{
                  name: "typeName"
                }}
                fullWidth
              >
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
          <GridItem xs={12} sm={6}>
            <TimePicker
              label="Start Time"
              value={startTime}
              name="startTime"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <TimePicker
              label="End Time"
              value={endTime}
              name="endTime"
              onChange={this._onChange}
            />
          </GridItem>
          <GridItem xs={12} align="right">
            <DefaultButton type="submit" onClick={this._onSubmit}>
              Create New
            </DefaultButton>
          </GridItem>
        </GridContainer>
      </Modal>
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
  { createNewService }
)(NewServiceModal);
