import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingIcon from '../components/loadingIcon';

// Reference: https://levelup.gitconnected.com/how-to-connect-hoc-with-react-and-redux-2b3bce6a7dbf

export default (WrappedComponent, actions) => {
  const fetchActions = actions.reduce((o, fn) => ({ ...o, [fn.name]: fn }), {});
  const propTypes = actions.reduce((o, fn) => ({ ...o, [fn.name]: PropTypes.func.isRequired }), {});

  const LoadingDataHOC = (props) => {
    const [loading, setLoading] = useState(true);

    // Reference: https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
      // Mke a list of actions that need to complete and wait for them to complete before ending loading state
      const actionPromises = actions.map(action => props[action.name]());
      Promise.all(actionPromises).then(() => setLoading(false));
    }, []);

    return (
      <LoadingIcon loading={loading}>
        <WrappedComponent {...props} />
      </LoadingIcon>
    );
  };

  LoadingDataHOC.propTypes = propTypes;

  // Reference: https://react-redux.js.org/api/connect
  return connect(null, fetchActions)(LoadingDataHOC);
};
