import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const DateAndTimePickers = props => {
  const { classes, label, onChange, value, name } = props;
  let timeNow;
  timeNow = moment.utc(new Date()).toDate();
  timeNow = moment(timeNow).local();
  timeNow = timeNow.format("YYYY-MM-DDThh:mm");

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label={label}
        type="datetime-local"
        defaultValue={value || timeNow}
        InputLabelProps={{
          shrink: true
        }}
        name={name}
        onChange={onChange}
        required
        fullWidth
        autoFocus
        variant="outlined"
      />
    </form>
  );
};

export default withStyles(styles)(DateAndTimePickers);
