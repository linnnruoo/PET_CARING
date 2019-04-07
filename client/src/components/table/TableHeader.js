import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const TableHeader = ({ headers, ...rest }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => {
          return (
            <TableCell key={index} {...rest}>
              <strong>{header}</strong>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
