import React, { Component } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Modal from "./Modal";
import DefaultButton from "../buttons/DefaultButton";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import Loader from "../loader/Loader";

import { connect } from "react-redux";
import { acceptBid } from "../../actions/bidActions";

// i'm lazy, lets do everything in one file
class AcceptBidModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: ""
    };
    this._onChange = this._onChange.bind(this);
    this._onAccept = this._onAccept.bind(this);
  }
  _onChange = e => {
    this.setState({ ownerId: e.target.value });
  };
  _onAccept = e => {
    e.preventDefault();

    const info = {
      ownerId: this.state.ownerId,
      serviceId: this.props.serviceId
    }

    console.log(info)

    this.props.onClose();
    this.props.acceptBid(info);
  };

  render() {
    const { onClose, open, bids } = this.props;
    return (
      <Modal label="Accept A Bid" onClose={onClose} open={open} fullWidth>
        <GridContainer spacing={16}>
          <GridItem xs={12} />
          <GridItem xs={12}>
            <FormLabel component="legend">Please select a final bid for this service</FormLabel>
            <RadioGroup
              aria-label="ownerId"
              name="ownerId"
              value={this.state.ownerId}
              onChange={this._onChange}
            >
              {(!bids.loading) ?
                (bids.bidsOfService).map((bidInfo, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={bidInfo.id.toString()}
                      control={<Radio color="primary" />}
                      label={'Owner: ' + bidInfo.first_name + ' ' + bidInfo.last_name + '. ' + ' Amt: $' + bidInfo.amount}
                    />
                  )
                })
                : <Loader />
              }
            </RadioGroup>
          </GridItem>
          <GridItem xs={12} align="right">
            <DefaultButton
              onClick={this._onAccept}
            >
              Accept
            </DefaultButton>
          </GridItem>
        </GridContainer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  bids: state.bids,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { acceptBid }
)(AcceptBidModal);
