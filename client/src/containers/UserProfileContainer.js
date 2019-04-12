import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPetsOfOwner } from "../actions/petActions";
import { fetchServicesOfCaretaker } from "../actions/serviceAction";
import { getUserProfileById } from "../actions/profileAction";
import { fetchRatingOfCaretaker } from "../actions/profileAction";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import { withRouter } from "react-router-dom";
import ProfileCard from "../components/cards/ProfileCard";
import PetInfoTable from "../components/table/PetInfoTable";
import ServiceInfoTable from "../components/table/ServiceInfoTable";
import Loader from "../components/loader/Loader";
import DefaultButton from "../components/buttons/DefaultButton";
import EditProfileModal from "../components/modals/EditProfileModal";

class UserProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      canEditProfile: false,
      isModalOpen: false,
      first_name: '',
      last_name: '',
      email: '',
      role: '',
    };
  }
  componentDidMount = () => {
    const userId = this.props.match.params.userId;
    this.props.getUserProfileById(userId);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.profile !== this.props.profile && !this.props.profile.loading) {
      const { userProfile } = this.props.profile;
      // console.log(userProfile);

      this.setState({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        email: userProfile.email,
        role: userProfile.role,
        rating: this.props.profile.currentCaretakerRating
      }, () => {
        const { role } = this.state;
        const userId = this.props.match.params.userId;
        if (role === "petowner") this.props.fetchPetsOfOwner(userId);
        else if (role === "caretaker") { 
          this.props.fetchServicesOfCaretaker(userId);
          this.props.fetchRatingOfCaretaker(userId);
        }

        const { user, isAuthenticated } = this.props.auth;
        // console.log("test", user.id, userId)
        if (isAuthenticated && userId === user.id.toString()) {
          this.setState({ canEditProfile: true });
        }
      })
    }
  }
  _onModalOpen = modalName => e => {
    this.setState({ [modalName]: true });
  };

  _onModalClose = modalName => e => {
    this.setState({ [modalName]: false });
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
    // caretaker: rating

    return (
      <>
      <GridContainer spacing={32}>
        <GridItem xs={12}>
          <ProfileCard first_name={this.state.first_name} role={this.state.role} rating={this.state.rating}/>
        </GridItem>
        <GridItem xs={12}>
        {
          (this.state.role === "petowner") ?
          this.renderOwner() : this.renderCaretaker()
        }
        </GridItem>
        { (this.state.canEditProfile) ?
          <DefaultButton onClick={this._onModalOpen('isModalOpen')}>Edit Profile</DefaultButton> : null
        }
      </GridContainer>
        {this.state.isModalOpen ?
          <EditProfileModal
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            onClose={this._onModalClose('isModalOpen')}
            open={this.state.isModalOpen}
          />
          : null
        }
      </>
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
    fetchServicesOfCaretaker,
    fetchRatingOfCaretaker
  }
)(withRouter(UserProfileContainer));
