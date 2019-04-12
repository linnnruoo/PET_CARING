import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import { Link } from "react-router-dom";

const headers = ["NAME", "EMAIL", "PROFILE"];

const CaretakerHomeTable = ({ users }) => {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <TableContainer>
        <TableHeader headers={headers} />
        <TableBody>
          {users.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link to={"/profile/" + user.id}>link</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default CaretakerHomeTable;
