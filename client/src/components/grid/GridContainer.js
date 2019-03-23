import React from "react";
import Grid from "@material-ui/core/Grid";

const GridContainer = ({ children, ...rest }) => {
  return (
    <Grid container {...rest}>
      {children}
    </Grid>
  );
}

export default GridContainer;
