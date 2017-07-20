import React, { PureComponent } from 'react';
import '../../main.css';
import {Route} from 'react-router-dom';
import Issues from './issues/issues.js';
import SubNavigation from './sub_navigation/subnav.js';
import Repo from './repo/repo.js';
import Description from './description/description.js';
import IssueList from './issue_list/issue-list.js';
import IssueHeader from './issue_header/issue-header.js';
import { connect } from 'react-redux';
import 'whatwg-fetch';


import getItems from '../../resources/items/items-selector.js';
import { itemAdd, fetchItems,itemClose,itemOpen } from '../../resources/items/items-actions.js';

class Main extends PureComponent {
  state = {
    tab: 'open',
    text: '',
  };

  openState = (status) => () => {
    status !== this.state.tab ? this.setState({tab : status}) : true;
  }

  search = (event) => {
    this.setState({text: event.target.value});
  }

  componentDidMount(){
    this.props.fetchItems();
  }

  render() {
    const newIssues = this.props.issues.filter((item) => item.title.indexOf(this.state.text) !== -1);
    return (
      <main className="content">
        <div className="pagehead">
          <Repo 
            repname="startupsummer" 
            taskname="react-task-1"
          />
          <Issues 
            issues={this.props.issues} 
          />
        </div>
        <div className="container">
          <div className="issues-listing">
            <SubNavigation 
              newIssue={this.props.itemAdd} 
              search={this.search} 
            />
            <IssueHeader 
              tab={this.state.tab}
              openState={this.openState}
              newIssues={newIssues} 
            />
            <Route 
              exact path="/" 
              component={(props) =>
              <IssueList 
                issues={newIssues} 
                tab={this.state.tab} 
                text={this.state.text}
                openIssue={this.props.itemOpen}
                closeIssue={this.props.itemClose}
                {...props} 
              />} 
            />
            <Route
              path="/:id"
              render={(props) => 
              <Description
                item={newIssues.find((issue) => props.match.params.id === issue.id)}
                location={props.location}
                {...props}
              />
              }
            />
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
    itemAdd: React.PropTypes.func.isRequired,
    fetchItems: React.PropTypes.func.isRequired,
    itemOpen: React.PropTypes.func.isRequired,
    itemClose: React.PropTypes.func.isRequired,
  }

export default connect(state => ({
  issues: getItems(state),
}), {
  itemAdd,
  fetchItems,
  itemOpen,
  itemClose,
})(Main);
