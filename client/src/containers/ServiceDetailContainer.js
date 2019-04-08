import React from "react";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import ServiceDetail from "../components/service/ServiceInfo";
import BidPanelCard from "../components/cards/BidPanel";
import Loader from "../components/loader/Loader";
import { connect } from "react-redux";
import { getServiceInfo } from "../actions/serviceAction";
import { withRouter } from "react-router-dom";

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
  }
  componentDidMount = () => {
    this.props.getServiceInfo(this.props.match.params.serviceId);
  };
  _onCreateBid = () => {};
  _onUpdateBid = () => {};
  _onCloseBid = () => {};

  render() {
    const { auth, services, bids } = this.props;
    let caretakerId = "";
    if (!services.loading) caretakerId = services.currentService.id;

    return (
      <GridContainer spacing={16}>
        <GridItem xs={12} sm={8}>
          {!services.loading ? (
            <ServiceDetail serviceInfo={services.currentService} />
          ) : (
            <Loader />
          )}
        </GridItem>
        <GridItem xs={12} sm={4}>
          <BidPanelCard auth={auth} caretakerId={caretakerId} />
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
  { getServiceInfo }
)(withRouter(ServiceDetailContainer));
