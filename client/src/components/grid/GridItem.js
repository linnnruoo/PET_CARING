import React from "react";
import Grid from "@material-ui/core/Grid";

const GridItem = ({ children, ...rest }) => {
  return (
    <Grid item xs={12} {...rest}>
      {children}
    </Grid>
  );
};

export default GridItem;
