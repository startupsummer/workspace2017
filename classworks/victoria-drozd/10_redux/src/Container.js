import React, {Component} from 'react';
import { connect } from 'react-redux';

import Subnav from './Subnav';
import Header from './Header';
import Body from './Body';

import { countIssues } from './resources/utils';

import { setCurrentTab, showOpenTab, showClosedTab } from './resources/issues.actions';
import fromStore from './resources/issues.selectors';

class Container extends Component {
  componentDidMount = () => {
    this.props.setCurrentTab();
  };

  render() {

    const { data, handleSearchText, handleCloseIssue } = this.props;
    const [openIssuesNum, closedIssuesNum] = countIssues(data);

    return (
      <div className="container">
        <div className="issues-listing">
          <Subnav
            onSearchText={handleSearchText}
          />
          <Header
            currentTab={this.props.currentTab}
            openIssuesNum={openIssuesNum}
            closedIssuesNum={closedIssuesNum}
            onShowOpenTab={this.props.handleShowOpenTab}
            onShowClosedTab={this.props.handleShowClosedTab}
          />
          <Body
            data={data}
            currentTab={this.props.currentTab}
            onCloseIssue={handleCloseIssue}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  currentTab: fromStore.getCurrentTab(state),
}), {
  setCurrentTab,
  handleShowOpenTab: showOpenTab,
  handleShowClosedTab: showClosedTab
})(Container);
