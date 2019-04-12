import React, { Component } from "react";
import GridContainer from "../components/grid/GridContainer";
import GridItem from "../components/grid/GridItem";
import Filter from "../components/filter/Filter";
import ServiceList from "../components/service/ServiceList";
import * as _ from 'lodash';

import { filterServices, getServicePageNumber } from "../actions/serviceAction";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'
import Loader from "../components/loader/Loader";
import PaginatorCenter from "../components/paginator/PaginatorCenter";

class BrowseContainer extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      // currentPage: 1,
      searchInput: "",
      serviceListings: [],
      // commitmentLevel: new Map(),
      petType: new Map(),
      queryPetType: [],
      // preferredDate: new Map(),
      endTime: '',
      startTime: '',
      pageNum: 1,
    };
    this._decodeQueryString = this._decodeQueryString.bind(this);
    this._formQueryString = this._formQueryString.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSearchFieldChange = this._onSearchFieldChange.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearchSubmit = this._onSearchSubmit.bind(this);
    this._handlePageChange = this._handlePageChange.bind(this);
  }
  componentDidMount = () => {
    this._decodeQueryString();
  };

  _decodeQueryString = () => {
    const values = queryString.parse(this.props.location.search);
    // console.log("title: ", values.title)
    this.setState({
      searchInput: values.title
    }, () => {
      this._formQueryString()
    })
  };

  _formQueryString = () => {
    // search project -> initial load
    // filter properly
    const { searchInput, startTime, endTime, queryPetType, pageNum } = this.state;
    // console.log(queryPetType);
    let petTypes = [];

    _.forEach(queryPetType, (value, key) => {
      if (value === true) {
        petTypes.push(key)
      }
    })

    // console.log(petTypes);

    const filter = {}

    if (_.size(searchInput) > 0) filter.title = searchInput;
    if (_.size(startTime) > 0) filter.startTime = startTime;
    if (_.size(endTime) > 0) filter.endTime = endTime;
    if (!_.isEmpty(petTypes)) filter.petTypes = petTypes;

    this.props.filterServices(pageNum, {filter});
    this.props.getServicePageNumber({filter});
  };

  _onCheckboxChange = filter => e => {
    const item_index = e.target.value;
    const isChecked = e.target.checked;
    const name = e.target.name;

    this.setState(
      prevState => ({
        [filter]: prevState[filter].set(item_index, { name, isChecked }),
        queryPetType: {...prevState.queryPetType, [name]: isChecked}
      })
    );
  };
  _onSearchFieldChange = e => {
    this.setState({ searchInput: e.target.value });
  };
  _onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  _handlePageChange = (page) => {
    console.log('page', page)
    this.setState({pageNum: page}, () => {
      this._formQueryString();
    });
  };

  _onSearchSubmit = e => {
    e.preventDefault();
    this._formQueryString();
  };

  render() {
    const {
      petType,
      endTime,
      startTime,
      searchInput
    } = this.state;
    const { services } = this.props;
    // console.log(services.pages)
    return (
      <GridContainer spacing={16}>
        <GridItem lg={3} md={3} xs={12}>
          <Filter
            petType={petType}
            searchInput={searchInput}
            endTime={endTime}
            startTime={startTime}
            _onChange={this._onChange}
            _onCheckboxChange={this._onCheckboxChange}
            _onSearchFieldChange={this._onSearchFieldChange}
            _onSearchSubmit={this._onSearchSubmit}
          />
        </GridItem>
        <GridItem lg={9} md={9} xs={12}>
          {
            (!services.loading) ? (
              <>
                <ServiceList serviceListings={services.filteredServices} />
                <PaginatorCenter
                  limit={limit}
                  total={services.pageNum * limit}
                  currentPage={this.state.pageNum}
                  pageCount={5}
                  handlePageChange={this._handlePageChange}
                />
            </>)
            :
            <Loader />
          }
        </GridItem>
      </GridContainer>
    );
  }
}

const limit = 20;

const mapStateToProps = state => ({
  services: state.services,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    filterServices,
    getServicePageNumber
  }
)(withRouter(BrowseContainer));
