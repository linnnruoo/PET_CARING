import React, { Component } from "react";
import Loader from "../components/loader/Loader";
import * as _ from "lodash";
import { connect } from "react-redux";
import { fetchServicesOfCaretaker } from "../actions/serviceAction";
import { fetchBidsOfCaretaker } from "../actions/bidActions";
import { getPetTypes } from "../actions/petActions";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import DefaultButton from "../components/buttons/DefaultButton";
import ServiceInfoTable from "../components/table/ServiceInfoTable";
import BidsOfServiceTable from "../components/table/BidsOfServiceTable";
import NewServiceModal from "../components/modals/NewServiceModal";
import { Typography } from "@material-ui/core";

class CaretakerDashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      isNewServiceModalOpen: false
    };
    this._onModalClose = this._onModalClose.bind(this);
    this._onModalOpen = this._onModalOpen.bind(this);
  }
  componentDidMount = () => {
    this.props.fetchServicesOfCaretaker(this.props.auth.user.id);
    this.props.fetchBidsOfCaretaker(this.props.auth.user.id);
    this.props.getPetTypes();
  };
  _onModalOpen = modalName => () => {
    this.setState({ [modalName]: true });
  };
  _onModalClose = modalName => () => {
    this.setState({ [modalName]: false });
  };

  render() {
    const { services, bids } = this.props;

    let bidsOfServices = {};
    bidsOfServices = _.groupBy(bids.bidsOfCaretaker, "sid");
    let bidsByServices = [];
    console.log(bidsOfServices)
    _.forEach(bidsOfServices, (bidsArr, index) => {
      bidsByServices.push(bidsArr);
    })

    const renderModals = () => {
      return (
        <>
          {this.state.isNewServiceModalOpen ? (
            <NewServiceModal
              open={this.state.isNewServiceModalOpen}
              onClose={this._onModalClose("isNewServiceModalOpen")}
            />
          ) : null}
        </>
      );
    };

    const renderBidsByService = () => {
      bidsByServices.map((bidsArr, index) => {
        return <BidsOfServiceTable key={index} bidsArr={bidsArr} title={bidsArr[0].title} />
      })
    }

    return (
      <>
        <GridContainer justify="center" alignItems="flex-start" spacing={16}>
          <GridItem xs={12} align="right">
            <DefaultButton
              onClick={this._onModalOpen("isNewServiceModalOpen")}
              style={{ backgroundColor: "#8d9f87" }}
            >
              Add Service
            </DefaultButton>
          </GridItem>
          <GridItem xs={12}>
            {!services.loading ? (
              <ServiceInfoTable userServices={services.userServices} />
            ) : (
              <Loader />
            )}
          </GridItem>
          <GridItem xs={12}>
            {
              !bids.loading ?
              <>
                <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }}>
                  Bids Details
                </Typography>
                {bidsByServices.map((bidsArr, index) => {
                  return <BidsOfServiceTable key={index} bidsArr={bidsArr} title={bidsArr[0].title} />
                })}
              </>
                : <Loader />
            }
          </GridItem>
        </GridContainer>
        {renderModals()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  services: state.services,
  bids: state.bids,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { fetchServicesOfCaretaker, getPetTypes, fetchBidsOfCaretaker }
)(CaretakerDashboardContainer);
