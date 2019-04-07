import React, { Component } from "react";
import DefaultButton from "../components/buttons/DefaultButton";
import NewPetModal from "../components/modals/NewPetModal";
import Loader from "../components/loader/Loader";
import { connect } from "react-redux";
import { fetchPetsOfOwner } from "../actions/petActions";
import { getPetBreedsAll, getPetTypes } from "../actions/petActions";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import PetInfoTable from "../components/table/PetInfoTable";
import DeletePetModal from "../components/modals/DeletePetModal";
import EditPetModal from "../components/modals/EditPetModal";

/**
 * @desc: owner container
 * @todo: list of the all pets, list of all the bids
 */
class OwnerDashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      isNewPetModalOpen: false,
      isEditPetModalOpen: false,
      isDeletePetModalOPen: false
    };
    this._onModalClose = this._onModalClose.bind(this);
    this._onModalOpen = this._onModalOpen.bind(this);
  }
  componentDidMount = () => {
    this.props.fetchPetsOfOwner(this.props.auth.user.id);
    this.props.getPetTypes();
    this.props.getPetBreedsAll();
  };
  _onModalOpen = modalName => () => {
    this.setState({ [modalName]: true });
  };
  _onModalClose = modalName => () => {
    this.setState({ [modalName]: false });
  };

  render() {
    const { pets } = this.props;
    return (
      <>
        <GridContainer justify="center" alignItems="flex-start" spacing={16}>
          <GridItem xs={12} align="right">
            <DefaultButton
              onClick={this._onModalOpen("isNewPetModalOpen")}
              style={{ backgroundColor: "#8d9f87" }}
            >
              Add Pet
            </DefaultButton>
            <DefaultButton onClick={this._onModalOpen("isEditPetModalOpen")}>
              Edit Pet Info
            </DefaultButton>
            <DefaultButton
              onClick={this._onModalOpen("isDeletePetModalOPen")}
              style={{ backgroundColor: "#696d7d" }}
            >
              Delete Pet
            </DefaultButton>
          </GridItem>
          <GridItem xs={12}>
            {!pets.loading ? (
              <PetInfoTable userPets={pets.userPets} />
            ) : (
              <Loader />
            )}
          </GridItem>
        </GridContainer>
        {this.state.isNewPetModalOpen ? (
          <NewPetModal
            open={this.state.isNewPetModalOpen}
            onClose={this._onModalClose("isNewPetModalOpen")}
          />
        ) : null}
        {this.state.isDeletePetModalOPen ? (
          <DeletePetModal
            open={this.state.isDeletePetModalOPen}
            onClose={this._onModalClose("isDeletePetModalOPen")}
          />
        ) : null}
        {this.state.isEditPetModalOpen ? (
          <EditPetModal
            open={this.state.isEditPetModalOpen}
            onClose={this._onModalClose("isEditPetModalOpen")}
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
