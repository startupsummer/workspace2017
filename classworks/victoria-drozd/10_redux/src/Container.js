import React, {Component} from 'react';
import Subnav from './Subnav';
import Header from './Header';
import Body from './Body';

import { countIssues } from './resources/utils';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'open'
    };
  }

  handleShowOpenTab = () => this.setState({currentTab: 'open'});

  handleShowClosedTab = () => this.setState({currentTab: 'closed'});

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
            currentTab={this.state.currentTab}
            openIssuesNum={openIssuesNum}
            closedIssuesNum={closedIssuesNum}
            onShowOpenTab={this.handleShowOpenTab}
            onShowClosedTab={this.handleShowClosedTab}
          />
          <Body
            data={data}
            currentTab={this.state.currentTab}
            onCloseIssue={handleCloseIssue}
          />
        </div>
      </div>
    );
  }
}
