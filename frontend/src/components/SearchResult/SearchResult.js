import React from 'react';
import './SearchResult.css';

const SearchResult = (props) => (
  <div className="searchResult">
    {props.address_name}
  </div>
);

export default SearchResult;
