import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Subnav from './components/Subnav';
import Header from './components/Header';
import Body from './components/Body';

import { countIssues } from '../../utils';

import { setCurrentTab, showOpenTab, showClosedTab } from '../../resources/issues.actions';
import fromStore from '../../resources/issues.selectors';

class Container extends Component {
  static propsTypes = {
    setCurrentTab: PropTypes.func.isRequired,
    handleShowOpenTab: PropTypes.func.isRequired,
    handleShowClosedTab: PropTypes.func.isRequired,
    handleCloseIssue: PropTypes.func.isRequired,
    handleSearchText: PropTypes.func.isRequired,

    currentTab: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  };

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
