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

  componentDidMount() {
    // Called from searchBar
    // this.props.fetchSearchData();
  }

  render() {
    return (
      <div>
        <SearchBar />

        {/* Number of results available for given query and filter options */}
        {this.props.numResults ? <p>{this.props.numResults} results</p> : null}

        {/* Go through passed data array and break into SearchItem elements */}
        {this.props.results && this.props.results.length ? this.props.results.map((element) => {
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

// Calls fetchResources and waits until complete to load SearchPane
const LoadingSearchPane = withLoading(SearchPane, [
  fetchResources,
]);

export default connect(mapStateToProps, {})(LoadingSearchPane);
