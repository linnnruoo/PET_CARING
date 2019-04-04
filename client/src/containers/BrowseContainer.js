import React, { Component } from "react";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import Filter from "../components/filter/Filter";
import ServiceList from "../components/service/ServiceList";

class BrowseContainer extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      currentPage: 1,
      searchInput: "",
      serviceListings: [],
      commitmentLevel: new Map(),
      petType: new Map(),
      preferredDate: new Map()
    };
    this._decodeQueryString = this._decodeQueryString.bind(this);
    this._formQueryString = this._formQueryString.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSearchFieldChange = this._onSearchFieldChange.bind(this);
    this._onSearchSubmit = this._onSearchSubmit.bind(this);
  }
  componentDidMount = () => {
    this._decodeQueryString();
    // search project
  };
  _decodeQueryString = () => {
    const query = this.props.query;
    console.log("query param", query);
  };
  _formQueryString = () => {};
  _onCheckboxChange = filter => e => {
    const item_index = e.target.value;
    const isChecked = e.target.checked;
    const name = e.target.name;

    this.setState(
      prevState => ({
        [filter]: prevState[filter].set(item_index, { name, isChecked }),
        subject: ""
      }),
      () => {
        this._formQueryString();
      }
    );
  };
  _onSearchFieldChange = e => {
    this.setState({ searchInput: e.target.value });
  };
  _onSearchSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      serviceListings,
      commitmentLevel,
      petType,
      preferredDate,
      searchInput
    } = this.state;
    return (
      <GridContainer spacing={16}>
        <GridItem lg={3} md={3} xs={12}>
          <Filter
            commitmentLevel={commitmentLevel}
            petType={petType}
            preferredDate={preferredDate}
            searchInput={searchInput}
            _onCheckboxChange={this._onCheckboxChange}
            _onSearchFieldChange={this._onSearchFieldChange}
            _onSearchSubmit={this._onSearchSubmit}
          />
        </GridItem>
        <GridItem lg={9} md={9} xs={12}>
          <ServiceList serviceListings={serviceListings} />
        </GridItem>
      </GridContainer>
    );
  }
}

export default BrowseContainer;
