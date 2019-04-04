import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const FilterGroupCheckbox = ({
  header,
  filterList,
  _onCheckboxChange,
  checkboxGroup,
  checkboxName
}) => {
  if (!filterList || filterList.length < 1) {
    return null;
  }

  return (
    <>
      <Typography style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
        {header}
      </Typography>
      <FormGroup>
        {filterList.map((item, index) => {
          return (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  onChange={_onCheckboxChange(checkboxName, item.name)}
                  value={item.id}
                  name={item.name}
                  checked={checkboxGroup.get(item.name)}
                  color="primary"
                />
              }
              label={item.name}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default FilterGroupCheckbox;
