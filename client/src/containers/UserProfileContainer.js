import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPetsOfOwner } from "../actions/petActions";
import { fetchServicesOfCaretaker } from "../actions/serviceAction";
import { getUserProfileById, updateUserProfile } from "../actions/profileAction";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import ProfileCard from "../components/cards/ProfileCard";
import PetInfoTable from "../components/table/PetInfoTable";
import ServiceInfoTable from "../components/table/ServiceInfoTable";
import Loader from "../components/loader/Loader";

class UserProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      canEditProfile: false,
      first_name: '',
      last_name: '',
      email: '',
      role: '',
    };
    this._onTextFieldChange = this._onTextFieldChange.bind(this);
    this._updateProfile = this._updateProfile.bind(this);
  }
  componentDidMount = () => {
    const { user, isAuthenticated } = this.props.auth;
    const userId = this.props.match.params.userId;
    this.props.getUserProfileById(userId);

    if (isAuthenticated && userId === user.id) {
      this.setState({ canEditProfile: true });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.profile !== this.props.profile && !this.props.profile.loading) {
      const { userProfile } = this.props.profile;
      console.log(userProfile);

      this.setState({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        role: userProfile.role
      }, () => {
        const { role } = this.state;
        const userId = this.props.match.params.userId;
        if (role === "petowner") this.props.fetchPetsOfOwner(userId);
        else if (role === "caretaker") this.props.fetchServicesOfCaretaker(userId)
      })
    }
  }
  componentWillReceiveProps = nextProps => {

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
    this.props.updateUserProfile(this.props.auth.user.id, userProfile);
  };

  renderOwner = () => {
    if (!this.props.pets.loading) {
      return <PetInfoTable userPets = {this.props.pets.userPets} />
    } else {
      return <Loader />
    }
  }
  renderCaretaker = () => {
    if (!this.props.services.loading) {
      return <ServiceInfoTable userServices={this.props.services.userServices} />
    } else {
      return <Loader />
    }
  }

  render() {
    // owner: display pets
    // caretaker: display services, rating
    // if im the user: i can edit my name

    return (
      <GridContainer spacing={32}>
        <GridItem xs={12}>
          <ProfileCard first_name={this.state.first_name} role={this.state.role} />
        </GridItem>
        <GridItem xs={12}>
        {
          (this.state.role === "petowner") ?
          this.renderOwner() : this.renderCaretaker()
        }
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pets: state.pets,
  bids: state.bids,
  services: state.services,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    fetchPetsOfOwner,
    getUserProfileById,
    updateUserProfile,
    fetchServicesOfCaretaker
  }
)(withRouter(UserProfileContainer));
