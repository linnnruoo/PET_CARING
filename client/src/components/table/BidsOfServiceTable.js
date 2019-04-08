import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

const headers = ["PET NAME", "BID", "OWNER NAME"];
const BidsOfServiceTable = ({ serviceTitle, bids }) => {
  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {serviceTitle}
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <TableHeader headers={headers} />
          <TableBody>
            {bids.map((bidInfo, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{bidInfo.petName}</TableCell>
                  <TableCell>{bidInfo.bidAmt}</TableCell>
                  <TableCell>{bidInfo.ownerName}</TableCell>
                  <TableCell>{/* STATUS */}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      </div>
    </>
  );
};

export default BidsOfServiceTable;
