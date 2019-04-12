import React from "react";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import ServiceDetail from "../components/service/ServiceInfo";
import BidPanelCard from "../components/cards/BidPanel";
import Loader from "../components/loader/Loader";
import { connect } from "react-redux";
import { getServiceInfo } from "../actions/serviceAction";
import { fetchPetsOfOwner } from "../actions/petActions";
import { fetchBidsOfService, fetchBidStatOfService } from "../actions/bidActions";
import { withRouter } from "react-router-dom";
import Paper from "../components/paper/Paper";
import BiddersPanel from "../components/cards/BiddersPanel";
import BidStat from "../components/cards/BidStat";

/**
 * @todo: current bids
 * @todo: all the bidders for service
 * @todo: owner -> able to bid services / update bid
 * @todo: care taker -> close bid
 * @todo: timer to count down
 */
class ServiceDetailContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
    this._onCloseService = this._onCloseService.bind(this);
  }
  componentDidMount = () => {
    const serviceId = this.props.match.params.serviceId;
    this.props.getServiceInfo(serviceId);
    this.props.fetchBidsOfService(serviceId);
    this.props.fetchBidStatOfService(serviceId);

    const { user, isAuthenticated } = this.props.auth;
    if (!isAuthenticated) return;
    if (user.role === "petowner") {
      this.props.fetchPetsOfOwner(user.id);
    }
  };
  _onCloseService = () => {
    // open modal -> msg: cant be reversed
  };

  render() {
    const { auth, services, bids } = this.props;
    let caretakerId = "";
    if (!services.loading) caretakerId = services.currentService.id;

    return (
      <GridContainer spacing={16}>
        <GridItem xs={12}>
          {!bids.loading ? (
            <BidStat bidStat={bids.bidStatOfService} />
          ) : (
            <Loader />
          )}
        </GridItem>

        <GridItem xs={12} sm={8}>
          <GridContainer direction="column">
            <GridItem xs={12}>
              {!services.loading ? (
                <ServiceDetail serviceInfo={services.currentService} />
              ) : (
                <Loader />
              )}
            </GridItem>
            <GridItem xs={12}>
              {/* todo: display the list of biddersm gonna write so many ugly codes */}
              {!bids.loading ? (
                <BiddersPanel bidsInfo={bids.bidsOfService} />
              ) : (
                <Loader />
              )}
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem xs={12} sm={4}>
          <GridContainer direction="column">
            {/* <GridItem xs={12}>
              TODO: gonna put a freaking timer here, maybe not
              <Paper />
            </GridItem> */}
            <GridItem xs={12}>
              {!services.loading ? (
                <BidPanelCard
                  auth={auth}
                  serviceId={this.props.match.params.serviceId}
                  caretakerId={caretakerId}
                  _onCloseService={this._onCloseService}
                />
              ) : (
                <Loader />
              )}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  services: state.services,
  bids: state.bids
});

export default connect(
  mapStateToProps,
  { getServiceInfo, fetchPetsOfOwner, fetchBidsOfService, fetchBidStatOfService }
)(withRouter(ServiceDetailContainer));
