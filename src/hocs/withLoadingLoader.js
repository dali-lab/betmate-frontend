import React from 'react';
import PropTypes from 'prop-types';

import LoadingIcon from '../components/loadingIcon';

// Functional loading component for displaying arbitrary loading component when prop loading is true
const WithLoadingLoader = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        { ...children }
      )}
    </>
  );
};

WithLoadingLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default WithLoadingLoader;
