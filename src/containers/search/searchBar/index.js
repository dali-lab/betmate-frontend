import React from 'react';
import { connect } from 'react-redux';

import { search } from '../../../actions/searchActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      // filters: [], // UNIMPLEMENTED
      sort: 'd',
      page: 1,
      numPerPage: 100,
    };

    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
    // this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.handleSortUpdate = this.handleSortUpdate.bind(this);
    this.handlePageUpdate = this.handlePageUpdate.bind(this);
    this.handleNumPerPageUpdate = this.handleNumPerPageUpdate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryUpdate(e) {
    this.setState({ query: e.target.value });
  }

  // handleFilterUpdate(e) {
  //   this.setState({ filters: e.target.value });
  // }

  handleSortUpdate(e) {
    this.setState({ sort: e.target.value });
  }

  handlePageUpdate(e) {
    this.setState({ page: e.target.value });
  }

  handleNumPerPageUpdate(e) {
    this.setState({ numPerPage: e.target.value });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(e) {
    this.props.search(this.state.query, this.state.filters, this.state.sort, this.state.page, this.state.numPerPage).then().catch((error) => {
      // Handle error
    });
    e.preventDefault(); // Pres reloading on form submit
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Search Bar */}
          <input type="search" placeholder="Enter search here!" value={this.state.query} onChange={this.handleQueryUpdate} />

          {/* UNIMPLEMENTED: Filtering Options */}
          {/* <label htmlFor="idRange">Max User ID</label>
          <input type="range" id="idRange" placeholder="User ID Range" min={0} max={10} /> */}

          {/* Sorting Options */}
          <select value={this.state.sort} onChange={this.handleSortUpdate}>
            <option value="d">Alphabetical</option>
            <option value="a">Inverse Alphabetical</option>
          </select>

          {/* Pagination Controls */}
          <select value={this.state.page} onChange={this.handlePageUpdate}>
            <option value="1">Page 1</option>
            <option value="2">Page 2</option>
            <option value="3">Page 3</option>
            <option value="4">Page 4</option>
          </select>

          {/* Number Per Page Options */}
          <select value={this.state.numPerPage} onChange={this.handleNumPerPageUpdate}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          {/* Submit Button */}
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default connect(null, { search })(SearchBar);
