import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";

const TableContainer = ({ classes, children }) => {
  return <Table className={classes.table}>{children}</Table>;
};

const styles = () => ({
  table: {
    minWidth: 600,
    width: "100%",
    overflowX: "auto",
    marginBottom: "30px"
  }
});

export default withStyles(styles)(TableContainer);
