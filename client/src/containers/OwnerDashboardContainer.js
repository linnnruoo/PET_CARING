import React, { Component } from "react";
import PetCard from "../components/cards/PetCard";
import DefaultButton from "../components/buttons/DefaultButton";
import NewPetModal from "../components/modals/NewPetModal";

/**
 * @todo: owner container / caretaker container routing
 * @todo: create pet container
 * @todo: create service container
 */
class OwnerDashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }
  _onModalOpen = () => {
    this.setState({ isModalOpen: true });
  };
  _onModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>
        <DefaultButton onClick={this._on}>Add Pet</DefaultButton>
        {this.state.isModalOpen ? (
          <NewPetModal
            open={this.state.isModalOpen}
            onClose={this._onModalClose}
          />
        ) : null}
        <PetCard />
      </div>
    );
  }
}

export default OwnerDashboardContainer;
