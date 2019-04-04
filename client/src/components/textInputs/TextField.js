import React from "react";
import { TextField as CustomTextField, Typography } from "@material-ui/core";

const TextField = ({ classes, required = true, label, errorMsg, ...rest }) => {
  return (
    <>
      <CustomTextField
        required={required}
        autoFocus
        fullWidth
        label={label}
        variant="outlined"
        margin="dense"
        InputProps={{ shrink: "true" }}
        {...rest}
      />
      {errorMsg && (
        <Typography variant="caption" color="error">
          {errorMsg}
        </Typography>
      )}
    </>
  );
};

export default TextField;
