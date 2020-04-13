import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchData } from '../../../actions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQueryUpdate = this.handleQueryUpdate.bind(this);
  }

  componentDidMount() {
    this.props.fetchSearchData().then().catch((error) => {
      // Handle error
    });
  }

  handleQueryUpdate(e) {
    this.setState({ query: e.target.value });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(e) {
    console.log(`Search '${this.state.query}' submitted!`);
    e.preventDefault(); // Pres reloading on form submit
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="search" placeholder="Enter search here!" value={this.state.query} onChange={this.handleQueryUpdate} />
          <select>
            <option value="one">Filter Option One</option>
            <option value="two">Filter Option Two</option>
            <option value="three">Filter Option Three</option>
            <option value="four">Filter Option Four</option>
          </select>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

export default connect(null, { fetchSearchData })(SearchBar);
