import React, {Component} from 'react';
import Subnav from './Subnav';
import Header from './Header';
import Body from './Body';

import {displayAll, countIssues} from './resources/utils';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'open'
    };
  }

  handleShowOpenTab = () => this.setState({currentTab: 'open'});

  handleShowClosedTab = () => this.setState({currentTab: 'closed'});

  handleAddNewIssue = () => {
    const {data, handleAddNewIssue} = this.props;

    const newData = data.concat({
      id: data[data.length - 1].id + 1,
      title: 'New issue',
      state: 'open'
    });

    handleAddNewIssue(displayAll(newData));
    this.handleShowOpenTab();
  };

  render() {
    const { data, handleSearchText, handleCloseIssue } = this.props;
    const [openIssuesNum, closedIssuesNum] = countIssues(data);

    return (
      <div className="container">
        <div className="issues-listing">
          <Subnav
            onAddNewIssue={this.handleAddNewIssue}
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
