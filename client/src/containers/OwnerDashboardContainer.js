import React, { Component } from "react";
import PetCard from "../components/cards/PetCard";
import DefaultButton from "../components/buttons/DefaultButton";
import NewPetModal from "../components/modals/NewPetModal";
import Loader from "../components/loader/Loader";
import { connect } from "react-redux";
import { fetchPetsOfOwner } from "../actions/petActions";
import { getPetBreedsAll, getPetTypes } from "../actions/petActions";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import PetInfoTable from "../components/table/PetInfoTable";

/**
 * @desc: owner container
 * @todo: list of the all pets, list of all the bids
 */
class OwnerDashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }
  componentDidMount = () => {
    this.props.fetchPetsOfOwner(this.props.auth.user.id);
    this.props.getPetTypes();
    this.props.getPetBreedsAll();
  };
  _onModalOpen = () => {
    this.setState({ isModalOpen: true });
  };
  _onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { pets } = this.props;
    return (
      <>
        <GridContainer justify="center" alignItems="flex-start" spacing={16}>
          <GridItem xs={12} align="right">
            <DefaultButton onClick={this._onModalOpen}>Add Pet</DefaultButton>
          </GridItem>
          <GridItem xs={12}>
            {!pets.loading ? (
              <PetInfoTable userPets={pets.userPets} />
            ) : (
              <Loader />
            )}
          </GridItem>
        </GridContainer>
        {this.state.isModalOpen ? (
          <NewPetModal
            open={this.state.isModalOpen}
            onClose={this._onModalClose}
          />
        ) : null}
      </>
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
  { fetchPetsOfOwner, getPetBreedsAll, getPetTypes }
)(OwnerDashboardContainer);
