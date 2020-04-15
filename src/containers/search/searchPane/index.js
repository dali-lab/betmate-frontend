import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withLoading from '../../../hocs/withLoading';

import SearchItem from '../../../components/searchItem';
import SearchBar from '../searchBar';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // Called from searchBar
    // this.props.fetchSearchData();
  }

  componentDidUpdate() {
    console.log('SearchPane props', this.props);
  }

  render() {
    return (
      <div>
        <SearchBar />

        {/* Number of results available for given query and filter options */}
        {this.props.numResults ? <p>{this.props.numResults} results</p> : null}

        {/* Go through passed data array and break into SearchItem elements */}
        {this.props.results.length ? this.props.results.map((element) => {
          return <SearchItem key={element.id || element._id} displayObject={element} />;
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.data.data,
  numResults: state.data.numResults,
});

export default connect(mapStateToProps, {})(SearchPane);
