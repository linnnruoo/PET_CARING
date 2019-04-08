import React from "react";
import Paper from "../paper/Paper";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

const ServiceDetail = ({ serviceInfo, biddersInfo }) => {
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Paper>{/* service info display */}</Paper>
      </GridItem>
      <GridItem xs={12}>
        <Paper />
        {/* biddersinfo display */}
      </GridItem>
    </GridContainer>
  );
};

export default ServiceDetail;
