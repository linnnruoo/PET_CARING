import React, { Component } from "react";
import home from "../assets/home.png";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import { Typography } from "@material-ui/core";
import { getAllCaretakersByPage } from "../actions/profileAction";
import { connect } from "react-redux";
import Loader from "../components/loader/Loader";
import CaretakerHomeTable from "../components/table/CaretakerHomeTable";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    this.props.getAllCaretakersByPage();
  }

  render() {
    const { profile } = this.props;

    const renderImage = () => {
      return (
        <img src={home} alt="home" style={{ marginTop: -30, width: "100%", height: "auto" }} />
      );
    };
    return (
      <GridContainer>
        <GridItem xs={12}>{renderImage()}</GridItem>
        <GridItem xs={12}>
          <Typography gutterBottom align="center" variant="h3" color="primary">Take a look at our top 50 Caretakers!</Typography>
          {
            (!profile.loading) ? <CaretakerHomeTable users={profile.allCaretakers}></CaretakerHomeTable> : <Loader />
          }
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {getAllCaretakersByPage})(HomeContainer);
