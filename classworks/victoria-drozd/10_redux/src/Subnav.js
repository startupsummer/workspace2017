import React, {PureComponent} from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import Btn from './Btn';

import { addNewIssue } from './resources/issues.actions';
import fromStore from './resources/issues.selectors';

class Subnav extends PureComponent {

  render() {
    const {onAddNewIssue, onSearchText} = this.props;
    return (
      <div className="issues-listing__subnav">
        <div className="subnav">
          <Search onSearchText={onSearchText} />
          <Btn classes="btn btn-primary" type="new-issue" onClick={() => onAddNewIssue(this.props.issues)}>
            New issue
          </Btn>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
}), {
  onAddNewIssue: addNewIssue
})(Subnav);
