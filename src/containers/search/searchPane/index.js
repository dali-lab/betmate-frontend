import React from 'react';
import { connect } from 'react-redux';

import { fetchResources } from '../../../actions/resourceActions';
import withLoading from '../../../hocs/withLoading';

import SearchItem from '../../../components/searchItem';
import SearchBar from '../searchBar';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <SearchBar />

        {/* Number of results available for given query and filter options */}
        {/* Check if there have been results loaded or if there is an array of resources in redux */}
        <p>{this.props.numResults || (this.props.results && this.props.results.length) ? this.props.numResults || this.props.results.length : 0} results</p>

        {/* Go through passed data array and break into SearchItem elements */}
        {this.props.results && this.props.results.length ? this.props.results.map((element) => {
          return <SearchItem key={element.id || element._id} displayObject={element} />;
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.data.resources,
  numResults: state.data.numResults,
});

// Calls fetchResources and waits until complete to load SearchPane
const LoadingSearchPane = withLoading(SearchPane, [
  fetchResources,
]);

export default connect(mapStateToProps, {})(LoadingSearchPane);
