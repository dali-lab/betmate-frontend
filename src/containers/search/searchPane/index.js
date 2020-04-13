import React from 'react';
import { connect } from 'react-redux';

import SearchItem from '../../../components/SearchItem';
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

        {/* Go through passed data array and break into SearchItem elements */}
        {this.props.testData.length ? this.props.testData.map((element) => {
          return <SearchItem key={element.id || element._id} displayObject={element} />;
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testData: state.data.data,
});

export default connect(mapStateToProps, {})(SearchPane);
