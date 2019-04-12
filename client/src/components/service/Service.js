import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import moment from "moment";

const ServiceItem = ({ item }) => {
  const start = moment.utc(item.starttime).toDate();
  const end = moment.utc(item.endtime).toDate();
  const formatedStart = moment(start)
    .local()
    .format("DD MMM YYYY hh:mm");
  const formatedEnd = moment(end)
    .local()
    .format("DD MMM YYYY hh:mm");

  return (
    <Card>
      <CardContent>
        <Typography>
          <Link to={"/service/" + item.sid.toString()}>{item.title}</Link>
        </Typography>
        <Typography>Caretaker: <Link to={"/profile/" + item.id.toString()}>{item.first_name} {item.last_name}</Link></Typography>
        <Typography>Start: {formatedStart}</Typography>
        <Typography>End: {formatedEnd}</Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
