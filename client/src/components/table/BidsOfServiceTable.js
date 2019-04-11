import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import { Link } from 'react-router-dom';

const headers = ["PET NAME", "BID", "OWNER NAME"];

const status_color = {
  pending: '#FFCD00',
  rejected: '#D51635',
  accepted: '#00843D',
}

const BidsOfServiceTable = ({ bidsArr, title }) => {
  return (
    <div style={{marginTop: 20}}>
      <Typography variant="h6" color="primary">
        Service: {title}
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <TableHeader headers={headers} />
          <TableBody>
            {bidsArr.map((bidInfo, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{bidInfo.petname}</TableCell>
                  <TableCell>${bidInfo.amount}</TableCell>
                  <TableCell>
                    <Link to={"/profile" + bidInfo.id}>{bidInfo.first_name} {bidInfo.last_name}</Link>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: status_color[bidInfo.status]}}>{bidInfo.status}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
};

export default BidsOfServiceTable;
