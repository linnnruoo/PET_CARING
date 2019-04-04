import React from "react";
import Button from "@material-ui/core/Button";

const DefaultButton = ({ children, styles, ...rest }) => {
  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      style={{
        color: "#fff",
        textTransform: "none",
        borderRadius: "36px",
        padding: "8px 30px",
        margin: "0px 5px 0px 5px",
        fontSize: 18,
        ...styles
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;
