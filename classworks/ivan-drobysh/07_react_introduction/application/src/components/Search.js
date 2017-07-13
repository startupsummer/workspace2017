import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <input className="subnav__search-input" onKeyPress={this.props.onKeyPress(false)} onBlur={this.props.onKeyPress(true)}type="text" placeholder="Search" />
    )
  }
}

export default Search;
