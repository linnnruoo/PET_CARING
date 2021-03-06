import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import { Link } from 'react-router-dom';

const headers = ["SERVICE", "PET NAME", "AMOUNT", "STATUS"];
const status_color = {
  pending: '#FFCD00',
  rejected: '#D51635',
  accepted: '#00843D',
}

const BidsOfOwnerTable = ({ bids }) => {
  console.log(bids)
  if (!bids || bids.length < 1) {
    return (
      <>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          My Bids
        </Typography>
        <Typography>You have not bidded for any services!</Typography>
      </>
    )
  }

  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        My Bids
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <TableHeader headers={headers} />
          <TableBody>
            {bids.map((bidInfo, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Link to={"/service/" + bidInfo.sid}>{bidInfo.title}</Link>
                  </TableCell>
                  <TableCell>{bidInfo.petname}</TableCell>
                  <TableCell>${bidInfo.amount}</TableCell>
                  <TableCell>
                    <Typography style={{ color: status_color[bidInfo.status]}}>{bidInfo.status}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      </div>
    </>
  );
};

export default BidsOfOwnerTable;
