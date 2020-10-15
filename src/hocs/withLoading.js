/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';

import WithLoadingLoader from './withLoadingLoader';
import { createLoadingSelector } from '../actions/requestActions';

// Reference: https://levelup.gitconnected.com/how-to-connect-hoc-with-react-and-redux-2b3bce6a7dbf

export default (WrappedComponent, actions) => {
  const LoadingDataHOC = ({ isLoading, ...props }) => (
    <WithLoadingLoader loading={isLoading}>
      <WrappedComponent isLoading={isLoading} {...props} />
    </WithLoadingLoader>
  );

  const mapStateToProps = (state) => ({
    isLoading: createLoadingSelector(actions)(state),
  });

  return connect(mapStateToProps, {})(LoadingDataHOC);
};
