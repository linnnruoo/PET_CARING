import React from "react";
import Paper from "../paper/Paper";
import { Typography, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

const BiddersPanel = ({ bidsInfo }) => {
  return (
    <Paper>
      <Typography gutterBottom variant="h5">
        Bidders Info
      </Typography>
      <GridContainer spacing={8}>
        {bidsInfo.map((bid, index) => {
          const { id, first_name, last_name, petname, amount } = bid;
          return (
            <GridItem xs={3}>
              <Card>
                <CardContent>
                  <Typography>
                    Bidder: {first_name} {last_name}
                  </Typography>
                  <Typography>Pet Name: {petname}</Typography>
                  <Typography>Bid: ${amount}</Typography>
                  <Typography variant="caption" align="right">
                    <Link to={"/profile/" + id}>User Profile</Link>
                  </Typography>
                </CardContent>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    </Paper>
  );
};

export default BiddersPanel;
