import React from 'react';
import PropTypes from 'prop-types';

// Functional loading component for displaying arbitrary loading component when prop loading is true
const LoadingIcon = ({ loading, children }) => {
  return (
    <React.Fragment>
      {loading ? (
        <div>Loading content...</div>
      ) : (
        { ...children }
      )}
    </React.Fragment>
  );
};

LoadingIcon.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoadingIcon;
