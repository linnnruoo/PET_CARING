import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };
  componentWillReceiveProps = nextProps => {
    if (this.props.auth !== nextProps.auth && nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      // TODO: ERROR HANDLING
      // this.setState({
      //   errors: nextProps.errors
      // });
    }
  };
  _onTextFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  _onSubmit = e => {
    e.preventDefault();
    const userAccInfo = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onClose();
    this.props.loginUser(userAccInfo);
  };

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        _onTextFieldChange={this._onTextFieldChange}
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
  { loginUser }
)(withRouter(LoginContainer));
