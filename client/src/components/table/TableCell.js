import React from "react";
import { TableCell as CustomCell } from "@material-ui/core";

const TableRow = ({ children }) => {
  return <CustomCell style={{ border: "none" }}>{children}</CustomCell>;
};

export default TableRow;
