import React, { Component } from "react";
import home from "../assets/home.png";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const renderImage = () => {
      return (
        <img src={home} alt="home" style={{ width: "100%", height: "auto" }} />
      );
    };
    return (
      <div className="container">
        <GridContainer>
          <GridItem xs={12}>{renderImage()}</GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default HomeContainer;
