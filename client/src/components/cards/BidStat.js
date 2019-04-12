import React from 'react';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import Paper from '../paper/Paper';
import { Typography } from '@material-ui/core';

const BidStat = ({ bidStat }) => {
    // current highest, lowerst, avg, total bids
  return (
    <GridContainer spacing={8}>
      <GridItem xs={12} sm={6} md={3}>
        <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EEB868'}} align="center">Current Max Bid</Typography>
          <Typography variant="h4" align="center">${bidStat.maximum}</Typography>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EEB868'}} align="center">Current Min Bid</Typography>
          <Typography variant="h4" align="center">${bidStat.minimum}</Typography>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EEB868'}} align="center">Current Avg Bid</Typography>
          <Typography variant="h4" align="center">${bidStat.average}</Typography>
        </Paper>
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EEB868'}} align="center">Number of Bidders</Typography>
          <Typography variant="h4" align="center">{bidStat.num}</Typography>
        </Paper>
      </GridItem>
    </GridContainer>
  )
}

export default BidStat;
