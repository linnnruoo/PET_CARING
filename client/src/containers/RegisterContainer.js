import React, { Component } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { withRouter } from "react-router-dom";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: ""
    };
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/myprofile");
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      // this.setState({
      //     errors: nextProps.errors
      // });
    }
  };
  _onTextFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _onCheckboxChange = e => {
    this.setState({
      role: e.target.value
    });
  };
  _onSubmit = e => {
    e.preventDefault();

    const registrationInfo = {
      email: this.state.email,
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      password: this.state.password,
      role: this.state.role
    };
    this.props.onClose();
    this.props.registerUser(registrationInfo, this.props.history);
  };

  render() {
    return (
      <RegisterForm
        email={this.state.email}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        password={this.state.password}
        role={this.state.role}
        _onTextFieldChange={this._onTextFieldChange}
        _onCheckboxChange={this._onCheckboxChange}
        _onSubmit={this._onSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterContainer));
