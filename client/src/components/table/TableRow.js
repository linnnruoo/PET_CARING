import React from "react";
import { TableRow as CustomRow } from "@material-ui/core";

const TableRow = ({ children }) => {
  return (
    <CustomRow
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 20px 0 rgba(0, 0, 0, 0.16)"
      }}
    >
      {children}
    </CustomRow>
  );
};

export default TableRow;
