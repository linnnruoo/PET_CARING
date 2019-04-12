import React, { Component } from "react";
import Paper from "../paper/Paper";
import DefaultButton from "../buttons/DefaultButton";
import { Typography } from "@material-ui/core";
import CreateBidModal from "../modals/CreateBidModal";
import AcceptBidModal from "../modals/AcceptBidModal";

class BidPanelCard extends Component {
  constructor() {
    super();
    this.state = {
      isAcceptBidModalOpen: false, // caretaker
      isCloseServiceModalOpen: false,
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
    const { auth, caretakerId, serviceStatus } = this.props;
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
          <DefaultButton disabled={serviceStatus === 1 ? true: false } onClick={this._onModalOpen("isChoosePetForBidding")}>
            {
              serviceStatus === 1 ? 'Service is closed for bidding' : "Bid for this service!" 
            }
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
          <DefaultButton disabled={serviceStatus === 1 ? true: false} style={{marginBottom: 20, marginTop: 20}} onClick={this._onModalOpen("isAcceptBidModalOpen")}>
            {
              serviceStatus === 1 ? 'You already accepted a bid!' : "Choose a Bid Now!!" 
            }
          </DefaultButton>
          {/* <DefaultButton style={{marginBottom: 20}} onClick={this._onModalOpen("isCloseServiceModalOpen")}>
            Close This Service
          </DefaultButton>
          <DefaultButton>
            Service Closed
          </DefaultButton> */}
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
      const { isAcceptBidModalOpen, isChoosePetForBidding, isCloseServiceModalOpen } = this.state;
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
          {isAcceptBidModalOpen && (
            <AcceptBidModal
              onClose={this._onModalClose("isAcceptBidModalOpen")}
              open={isAcceptBidModalOpen}
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
