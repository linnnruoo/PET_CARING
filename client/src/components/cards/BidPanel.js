import React, { Component } from "react";
import Paper from "../paper/Paper";
import DefaultButton from "../buttons/DefaultButton";
import { Typography } from "@material-ui/core";
import CreateBidModal from "../modals/CreateBidModal";

class BidPanelCard extends Component {
  constructor() {
    super();
    this.state = {
      isChooseBidModalOpen: false, // caretaker
      isChoosePetForBidding: false // owner
    };
    this._onModalClose = this._onModalClose.bind(this);
    this._onModalOpen = this._onModalOpen.bind(this);
  }
  componentDidMount = () => {
    // check if its owner and has bidded for this service
  };
  _onModalOpen = modalName => () => {
    this.setState({ [modalName]: true });
  };
  _onModalClose = modalName => () => {
    this.setState({ [modalName]: false });
  };

  render() {
    const { auth, caretakerId, _onCloseService } = this.props;
    const { user } = auth;
    const visitorPanel = () => {
      return (
        <Typography gutterBottom variant="h6">
          Please login to view more info!
        </Typography>
      );
    };
    const caretakerPanel = () => {
      return (
        <Typography gutterBottom variant="h6">
          This is not a service offered by you!
        </Typography>
      );
    };
    const ownerPanel = () => {
      return (
        <>
          <Typography gutterBottom variant="h6">
            Choose an Action
          </Typography>
          <DefaultButton onClick={this._onModalOpen("isChoosePetForBidding")}>
            Bid for this service!
          </DefaultButton>
          {/* TODO: IF HAS BIDDED */}
          {/* <DefaultButton>Update This Bid</DefaultButton>
        <DefaultButton>Delete This Bid</DefaultButton> */}
        </>
      );
    };
    const hostPanel = () => {
      return (
        <>
          <Typography gutterBottom variant="h6">
            You are the host of this service!
          </Typography>
          <DefaultButton style={{marginBottom: 20, marginTop: 20}} onClick={this._onModalOpen("isChooseBidModalOpen")}>
            Choose a Bid Now!
          </DefaultButton>
          <DefaultButton style={{marginBottom: 20}} onClick={_onCloseService}>
            Close This Service
          </DefaultButton>
        </>
      );
    };
    const renderUserPanel = () => {
      if (user.role === "petowner") return ownerPanel();
      else if (caretakerId === user.id) return hostPanel();
      else if (user.role === "caretaker") return caretakerPanel();
      else return visitorPanel();
    };

    const renderModal = () => {
      const { isChooseBidModalOpen, isChoosePetForBidding } = this.state;
      return (
        <>
          {isChoosePetForBidding && (
            <CreateBidModal
              onClose={this._onModalClose("isChoosePetForBidding")}
              open={isChoosePetForBidding}
              label="Create New Bid"
              serviceId={this.props.serviceId}
            />
          )}
        </>
      );
    };
    return (
      <>
        <Paper style={{ minHeight: 100 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            {renderUserPanel()}
          </div>
        </Paper>
        {renderModal()}
      </>
    );
  }
}

export default BidPanelCard;
