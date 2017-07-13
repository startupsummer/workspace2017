import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <input className="subnav__search-input" onChange={this.props.onChange} type="text" placeholder="Search" />
    )
  }
}

export default Search;
