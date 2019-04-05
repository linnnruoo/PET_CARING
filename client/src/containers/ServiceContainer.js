import React from "react";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import { connect } from "react-redux";
import ServiceDetail from "../components/service/ServiceInfo";
import BidPanelCard from "../components/cards/BidPanel";

/**
 * @todo: current bids
 * @todo: all the bidders
 * @todo: owner -> able to bid services / update bid
 * @todo: care taker -> close bid
 * @todo: timer to count down
 */
class ServiceDetailContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { auth } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={8}>
          <ServiceDetail />
        </GridItem>
        <GridItem xs={12} sm={4}>
          <BidPanelCard auth={auth} />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ServiceDetailContainer);
