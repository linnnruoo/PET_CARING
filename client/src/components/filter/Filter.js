import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import Paper from "../paper/Paper";
import DefaultButton from "../buttons/DefaultButton";
import TextField from "../textInputs/TextField";
import FilterGroupCheckbox from "./FilterGroupCheckbox";
import SVGIconButton from "../buttons/SVGIconButton";
import { UpArrowIcon, DownArrowIcon } from "../../constants/icon_list";
import {
  dateList,
  petTypeList,
  commitmentList
} from "../../constants/filter_list";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import TimePicker from "../pickers/TimePicker";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandFilter: false
    };
    this._toggleFilter = this._toggleFilter.bind(this);
  }
  _toggleFilter = () => {
    this.setState({ expandFilter: !this.state.expandFilter }, () =>
      console.log(this.state.expandFilter)
    );
  };

  render() {
    const {
      searchInput,
      endTime,
      petType,
      startTime,
      _onChange,
      _onCheckboxChange,
      _onSearchFieldChange,
      _onSearchSubmit
    } = this.props;
    return (
      <Paper>
        <div
          onClick={this._toggleFilter}
          style={{
            display: "flex",
            alignContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h5">Search Results</Typography>
          <span>
            {this.state.expandFilter ? (
              <SVGIconButton color="#000" pathName={UpArrowIcon} />
            ) : (
              <SVGIconButton color="#000" pathName={DownArrowIcon} />
            )}
          </span>
        </div>

        <div
          className={`card-body ${
            this.state.expandFilter ? "" : "d-none d-xl-block"
          }`}
        >
          <GridContainer spacing={32}>
            <GridItem xs={12}>
              <TextField
                value={searchInput}
                label="Search Keyword"
                onChange={_onSearchFieldChange}
                required={false}
              />
            </GridItem>
            <GridItem xs={12}>
              <FilterGroupCheckbox
                header="Pet Type"
                filterList={petTypeList}
                checkboxGroup={petType}
                _onCheckboxChange={_onCheckboxChange}
                checkboxName="petType"
              />
            </GridItem>
            <GridItem xs={12}>
              <TimePicker
                label="Start Time"
                value={startTime}
                name="startTime"
                onChange={_onChange}
                style={{ marginBottom: 30 }}
              />
            </GridItem>
            <GridItem xs={12}>
              <TimePicker
                label="End Time"
                value={endTime}
                name="endTime"
                onChange={_onChange}
                style={{ marginBottom: 30 }}
              />
            </GridItem>
            <GridItem xs={12} align="center">
              <DefaultButton onClick={_onSearchSubmit}>Search</DefaultButton>
            </GridItem>
          </GridContainer>
        </div>
      </Paper>
    );
  }
}

export default Filter;
