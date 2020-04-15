import React from 'react';
import LoadingIcon from '../components/loadingIcon';

const isEmpty = prop => (
  prop === null
  || prop === undefined
  || (prop.length && prop.length === 0)
  || (prop.constructor === Object && Object.keys(prop).length === 0)
);

function withLoading(WrappedComponent, loadingProp) {
  // https://reactjs.org/docs/higher-order-components.html
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    isLoading() {
      const testProp = this.props[loadingProp];
      console.log('testProp', loadingProp, testProp, testProp === undefined);

      // if (Array.isArray(testProp)) {
      //   console.log('array', testProp.length <= 0);
      //   return testProp.length <= 0;
      // } else {
      //   console.log('not array', testProp === undefined);
      //   return testProp === undefined;
      // }
      return testProp === undefined;
    }

    render() {
      // return this.isLoading() ? <LoadingIcon /> : <WrappedComponent {...this.props} />;
      return <div style={this.isLoading() ? { visibility: 'hidden' } : {}}><WrappedComponent {...this.props} /></div>;
    }
  };
}

export default withLoading;
