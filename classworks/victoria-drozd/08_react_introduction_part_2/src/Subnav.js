import React, { Component } from 'react';
import Search from './Search';
import Btn from './Btn';

export default class Subnav extends Component {
  constructor(props) {
    super(props);
    this.addNewIssue = this.addNewIssue.bind(this);
    this.searchText = this.searchText.bind(this);
  }

  addNewIssue() {
    this.props.onAddNewIssue();
  }

  searchText(text) {
    this.props.onSearchText(text);
  }

  render() {
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <Search onSearchText={this.searchText} />
          <Btn classes="btn btn-primary" text="New issue" type="new-issue" onAddNewIssue={this.addNewIssue}/>
        </div>
      </div>
    );
  }
}
