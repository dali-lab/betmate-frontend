import React from 'react';
import { connect } from 'react-redux';

import withLoading from '../../../hocs/withLoading';

import ActionTypes from '../../../actions';
import { fetchResources, updateResourceByID } from '../../../actions/resourceActions';
import { createErrorSelector } from '../../../actions/requestActions';

import SearchItem from '../../../components/searchItem';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        {this.props.isLoading ? 'Loading results...' : (this.props.errorMessage
          || (
          <>
            {/* Number of results available for given query and filter options */}
            {/* Check if there have been results loaded or if there is an array of resources in redux */}
            <p>{this.props.numResults || (this.props.results && this.props.results.length) ? this.props.numResults || this.props.results.length : 0} results</p>

            {/* Go through passed data array and break into SearchItem elements */}
            {this.props.results && this.props.results.length ? this.props.results.map((element) => {
              return <SearchItem key={element.id || element._id} displayObject={element} />;
            }) : null}
          </>
          )
        )}
      </div>
    );
  }
}

// Import loading state and error messages of specified actions from redux state
const errorSelector = createErrorSelector([ActionTypes.SEARCH, ActionTypes.FETCH_RESOURCES]);

const mapStateToProps = (state) => ({
  results: state.resource.results,
  numResults: state.resource.numResults,
  errorMessage: errorSelector(state),
});

// Waits for fetchResources action to resolve or reject
const LoadingSearchPane = withLoading(SearchPane, [ActionTypes.FETCH_RESOURCES, ActionTypes.SEARCH]);

export default connect(mapStateToProps, { fetchResources, updateResourceByID })(LoadingSearchPane);
