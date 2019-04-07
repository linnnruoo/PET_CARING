import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

const headers = ["NAME", "TYPE", "BREED", "AGE", "GENDER"];
const PetInfoTable = ({ userPets }) => {
  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        My Pets
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <TableHeader headers={headers} />
          <TableBody>
            {userPets.map((petInfo, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{petInfo.name}</TableCell>
                  <TableCell>{petInfo.typename}</TableCell>
                  <TableCell>{petInfo.breedname}</TableCell>
                  <TableCell>{petInfo.age}</TableCell>
                  <TableCell>
                    {petInfo.gender === "F" ? "Female" : "Male"}
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

export default PetInfoTable;
