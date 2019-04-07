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
      commitmentLevel,
      petType,
      preferredDate,
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
          <form>
            <TextField
              value={searchInput}
              label="Search Keyword"
              onChange={_onSearchFieldChange}
              required={false}
              style={{ marginBottom: 30 }}
            />
            <FilterGroupCheckbox
              header="Preferred Date"
              filterList={dateList}
              checkboxGroup={preferredDate}
              _onCheckboxChange={_onCheckboxChange}
              checkboxName="preferredDate"
            />
            <FilterGroupCheckbox
              header="Pet Type"
              filterList={petTypeList}
              checkboxGroup={petType}
              _onCheckboxChange={_onCheckboxChange}
              checkboxName="petType"
            />
            <FilterGroupCheckbox
              header="Commitment Level"
              filterList={commitmentList}
              checkboxGroup={commitmentLevel}
              _onCheckboxChange={_onCheckboxChange}
              checkboxName="commitmentLevel"
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <DefaultButton onClick={_onSearchSubmit}>Search</DefaultButton>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

export default Filter;
