import React from 'react';
import { connect } from 'react-redux';

import withLoading from '../../../hocs/withLoadingOld';

import { fetchResources, updateResourceByID } from '../../../actions/resourceActions';
import { createErrorSelector, createLoadingSelector } from '../../../actions/requestActions';

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
        <>
          <SearchBar />
          <div>
            {/* eslint-disable-next-line no-nested-ternary */}
            { this.props.isLoading === false
              ? (this.props.errorMessage || (
                <>
                  {/* Number of results available for given query and filter options */}
                  {/* Check if there have been results loaded or if there is an array of resources in redux */}
                  <p>{this.props.numResults || (this.props.results && this.props.results.length) ? this.props.numResults || this.props.results.length : 0} results</p>

                  {/* Go through passed data array and break into SearchItem elements */}
                  {this.props.results && this.props.results.length ? this.props.results.map((element) => {
                    return <SearchItem key={element.id || element._id} displayObject={element} />;
                  }) : null}
                </>
              ))
              : <div>Searching...</div>}
          </div>
        </ >
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const loadActions = ['SEARCH', 'FETCH_RESOURCES'];
const loadingSelector = createLoadingSelector(loadActions);
const errorSelector = createErrorSelector(loadActions);

const mapStateToProps = (state) => ({
  results: state.data.resources,
  numResults: state.data.numResults,
  isLoading: loadingSelector(state),
  errorMessage: errorSelector(state),
});

// TODO: Add error boundary to catch error messages

// Calls fetchResources and waits until complete to load SearchPane
const LoadingSearchPane = withLoading(SearchPane, [
  fetchResources,
]);

export default connect(mapStateToProps, { updateResourceByID })(LoadingSearchPane);
