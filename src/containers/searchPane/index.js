import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchData } from '../../actions';
import SearchItem from '../../components/SearchItem';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.fetchSearchData();
  }

  render() {
    return (
      <div>
        {this.props.testData.length ? this.props.testData.map((element) => {
          return <SearchItem displayObject={element} />;
        }) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testData: state.data.data,
});

export default connect(mapStateToProps, { fetchSearchData })(SearchPane);
