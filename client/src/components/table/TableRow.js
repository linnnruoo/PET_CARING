import React from "react";
import { TableRow as CustomRow } from "@material-ui/core";

const TableRow = ({ children, boxShadow=true }) => {
  return (
    <CustomRow
      style={{
        backgroundColor: "#ffffff",
        boxShadow: boxShadow ? "0 3px 20px 0 rgba(0, 0, 0, 0.16)" : ''
      }}
    >
      {children}
    </CustomRow>
  );
};

export default TableRow;
