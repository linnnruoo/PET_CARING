import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const PetCard = ({ classes, petProfile }) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Cat" />
      <CardMedia
        className={classes.media}
        image="https://images.pexels.com/photos/20787/pexels-photo.jpg?cs=srgb&dl=adorable-animal-cat-20787.jpg&fm=jpg"
        title="neko"
      />
      <CardContent>
        <Typography>Gender: </Typography>
        <Typography>Breed: </Typography>
        <Typography>Age: </Typography>
      </CardContent>
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

export default withStyles(styles)(PetCard);
