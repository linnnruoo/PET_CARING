import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import TableHeader from "./TableHeader";
import TableContainer from "./TableContainer";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import moment from "moment";

const headers = ["TITLE", "EXPECTED AMT", "START TIME", "END TIME", "TYPE"];
const ServiceInfoTable = ({ userServices }) => {
  return (
    <>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        My Services
      </Typography>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <TableContainer>
          <TableHeader headers={headers} />
          <TableBody>
            {userServices.map((serviceInfo, index) => {
              const start = moment.utc(serviceInfo.starttime).toDate();
              const end = moment.utc(serviceInfo.endtime).toDate();
              const formatedStart = moment(start)
                .local()
                .format("DD MMM YYYY hh:mm");
              const formatedEnd = moment(end)
                .local()
                .format("DD MMM YYYY hh:mm");

              return (
                <TableRow key={serviceInfo.sid}>
                  <TableCell>
                    <Link to={"/service/" + serviceInfo.sid}>{serviceInfo.title}</Link>
                  </TableCell>
                  <TableCell>{serviceInfo.expected}</TableCell>
                  <TableCell>{formatedStart}</TableCell>
                  <TableCell>{formatedEnd}</TableCell>
                  <TableCell>{serviceInfo.typename}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      </div>
    </>
  );
};

export default ServiceInfoTable;
