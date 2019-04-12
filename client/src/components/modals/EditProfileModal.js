import React from 'react';
import Modal from './Modal';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import TextField from '../textInputs/TextField';
import DefaultButton from '../buttons/DefaultButton';
import { connect } from "react-redux";
import { updateUserProfile } from "../../actions/profileAction";

class EditProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: props.first_name,
      last_name: props.last_name,
    }
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._updateProfile = this._updateProfile.bind(this);
  }
  _onTextFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _updateProfile = e => {
    e.preventDefault();
    const userProfile = {
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };
    this.props.onClose();
    this.props.updateUserProfile(this.props.auth.user.id, userProfile);
  };

  render() {
    const { onClose, open } = this.props;
    const { first_name, last_name } = this.state;

    return (
      <Modal label="Update Your Profile" onClose={onClose} open={open} fullWidth>
        <GridContainer>
          <GridItem xs={12} sm={6}>
            <TextField
              label='First Name'
              value={first_name}
              name="first_name"
              onChange={this._onTextFieldChange}
            />
          </GridItem>
          <GridItem xs={12} sm={6}>
            <TextField
              label='Last Name'
              value={last_name}
              name="last_name"
              onChange={this._onTextFieldChange}
            />
          </GridItem>
          <GridItem xs={12} align="right">
            <DefaultButton onClick={this._updateProfile}>Update</DefaultButton>
          </GridItem>
        </GridContainer>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { updateUserProfile })(EditProfileModal);
