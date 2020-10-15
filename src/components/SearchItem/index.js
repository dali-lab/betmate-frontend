import React from 'react';
import PropTypes from 'prop-types';

function SearchItem(props) {
  return (
    <div>
      {
        // Displays whatever object is passed as displayObject prop
        Object.entries(props.displayObject).map(([k, v]) => {
          return <div key={k}>{JSON.stringify(k)}: {JSON.stringify(v)}</div>;
        })
      }
      {/* To make things cleaner */}
      <br />
    </div>
  );
}

SearchItem.propTypes = {
  displayObject: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SearchItem;
