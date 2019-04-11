import React from 'react';
import GridContainer from '../grid/GridContainer';
import GridItem from '../grid/GridItem';
import Paper from '../paper/Paper';
import { Typography } from '@material-ui/core';

const IncomePanel = ({ potentialIncome, currentIncome }) => {
  return (
    <>
      <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }}>
        My Income
      </Typography>
      <GridContainer spacing={8}>
      <GridItem xs={12} sm={4}>
          <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EC4E20'}} align="center">Current Income</Typography>
          <Typography variant="h4" align="center">${currentIncome}</Typography>
          </Paper>
      </GridItem>
      <GridItem xs={12} sm={4}>
          <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EC4E20'}} align="center">Future Income</Typography>
          <Typography variant="h4" align="center">${potentialIncome - currentIncome}</Typography>
          </Paper>
      </GridItem>
      <GridItem xs={12} sm={4}>
          <Paper>
          <Typography style={{fontWeight: 'bold', color: '#EC4E20'}} align="center">Potential Income</Typography>
          <Typography variant="h4" align="center">${potentialIncome}</Typography>
          </Paper>
      </GridItem>
      </GridContainer>
    </>
  )
}

export default IncomePanel;
