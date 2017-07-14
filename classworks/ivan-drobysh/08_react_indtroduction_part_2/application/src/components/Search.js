import React, { Component } from 'react';

function Search (props) {
    return (
      <input className="subnav__search-input" onChange={props.onChange} type="text" placeholder="Search" />
    )
}

export default Search;
