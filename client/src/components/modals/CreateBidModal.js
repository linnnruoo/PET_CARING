import React, { Component } from "react";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DefaultButton from "../buttons/DefaultButton";
import Modal from "./Modal";
import { connect } from "react-redux";
import { createNewBid } from "../../actions/bidActions";
import TextField from "../textInputs/TextField";

class CreateBidModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petNameChosen: props.petNameChosen || "",
      amount: props.amount || ""
    };
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onTextFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  _onSubmit = e => {
    e.preventDefault();
    const bidInfo = {
      petName: this.state.petNameChosen,
      ownerId: this.props.auth.user.id,
      serviceId: this.props.serviceId,
      amount: this.state.amount
    };
    this.props.createNewBid(bidInfo);
    this.props.onClose();
  };

  render() {
    const { label, onClose, open, pets } = this.props;
    return (
      <Modal label={label} onClose={onClose} open={open}>
        <GridContainer spacing={16}>
          <GridItem xs={12} />
          <GridItem xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Your Pet for Bidding</InputLabel>
              <Select
                variant="outlined"
                value={this.state.petNameChosen}
                onChange={this._onTextFieldChange}
                inputProps={{
                  name: "petNameChosen"
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {pets.userPets &&
                  pets.userPets.map((pet, index) => {
                    return (
                      <MenuItem key={index} value={pet.name}>
                        {pet.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12}>
            <TextField
              label="Bidding Amount"
              value={this.state.amount}
              name="amount"
              type="number"
              onChange={this._onTextFieldChange}
            />
          </GridItem>
          <GridItem xs={12} align="right">
            <DefaultButton onClick={this._onSubmit}>Bid!</DefaultButton>
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
  { createNewBid }
)(CreateBidModal);
