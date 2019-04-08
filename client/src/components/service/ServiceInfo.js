import React from "react";
import Paper from "../paper/Paper";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";

const ServiceDetail = ({ serviceInfo }) => {
  const start = moment.utc(serviceInfo.starttime).toDate();
  const end = moment.utc(serviceInfo.endtime).toDate();
  const formatedStart = moment(start)
    .local()
    .format("DD MMM YYYY hh:mm");
  const formatedEnd = moment(end)
    .local()
    .format("DD MMM YYYY hh:mm");

  return (
    <GridContainer spacing={16}>
      <GridItem xs={12}>
        <Paper>
          <Typography variant="h5">Service Info</Typography>
          <Typography>Title: {serviceInfo.title}</Typography>
          <Typography>Pet Type: {serviceInfo.typename}</Typography>
          <Typography>Start Time: {formatedStart}</Typography>
          <Typography>End Time: {formatedEnd}</Typography>
          <Typography>Expected Pay ${serviceInfo.expected}</Typography>
          <Typography>
            Caretaker:{" "}
            <Link to={"/profile/" + serviceInfo.id}>
              {serviceInfo.first_name} {serviceInfo.last_name}
            </Link>
          </Typography>
        </Paper>
      </GridItem>
    </GridContainer>
  );
};

export default ServiceDetail;
