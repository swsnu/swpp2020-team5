import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchResult.css';

// eslint-disable-next-line react/prefer-stateless-function
class SearchResult extends Component {
  render() {
    const { addressName } = this.props;
    return (
      <div className="searchResult">
        {addressName}
      </div>
    );
  }
}

SearchResult.propTypes = {
  addressName: PropTypes.string,
};

SearchResult.defaultProps = {
  addressName: '',
};

export default SearchResult;
