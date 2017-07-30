import React, {PureComponent} from 'react';
import Search from './Search';
import Btn from './Btn';

export default class Subnav extends PureComponent {
  render() {
    const {onAddNewIssue, onSearchText} = this.props;
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <Search onSearchText={onSearchText}/>
          <Btn classes="btn btn-primary" type="new-issue" onClick={onAddNewIssue}>
            New issue
          </Btn>
        </div>
      </div>
    );
  }
}
