import React from "react";
import './SearchResult.css'

const SearchResult = props => {
  return (
    <div className = "searchResult">
      {props.address_name}
    </div>
  )
}

export default SearchResult