import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListingSubnav from './ListingSubnav';
import ListingHeader from './ListingHeader';
import ListingBody from './ListingBody';
import IssueDescription from './IssueDescription';
import PropTypes from 'prop-types';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTab: 'open',
      items: this.props.items,
      initialItems: this.props.items
    }
  }

  static propTypes = {
    itemsNumber: PropTypes.string,
    items: PropTypes.array,
  }

  enableOpenTab = () => {
    this.setState({
      openTab: 'open',
    })
  }

  enableCloseTab = () => {
    this.setState({
      openTab: 'closed',
    })
  }

  changeIssueState = (id) => {
    const items = this.state.items;
    const newItems = [...items];
    newItems.forEach((item, i) => {
      if (item.id === id) {
        item.state = (item.state === 'open') ?
          item.state = 'closed'
          :
          item.state = 'open';  
      }
    });

    this.setState({
      items: newItems,
    })

  }

  addIssues = () => {
    this.props.allIssuesNumber(this.state.items.length + 1);
    const id = ~~(Math.random() * 1000000);
    const title = `Something went wrong with my mind ${~~(Math.random() * 200)}`;
    const state = 'open';
    const items = this.state.items;
    const newItems = [
      ...items,
      {
        id,
        title,
        state
      }
    ]
    
    this.setState({
      items: newItems,
      initialItems: newItems,
    });
  }

  searchIssue = (input) => {
    const foundItems = this.state.initialItems
      .filter((item) => item.title.toLowerCase()
      .includes(input.toLowerCase()));
    
    this.setState({
      items: foundItems,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="issues-listing">
          <Route
            exact path="/"
            component={() => (
              <div>
                <ListingSubnav
                  onClick={this.addIssues} 
                  onChange={this.searchIssue}  
                />
                <ListingHeader
                  enableOpenTab={this.enableOpenTab}
                  enableCloseTab={this.enableCloseTab}
                  items={this.state.items}
                  openTab={this.state.openTab}
                />
                <ListingBody
                  openTab={this.state.openTab}
                  items={this.state.items}
                  changeIssueState={this.changeIssueState}
                />
              </div>
            )}
          />
          <Route
            path="/issue/:number"
            component={(props) => (
              <IssueDescription
                number={props.match.params.number}
                items={this.state.items}
              />
            )}
          />
        </div>
      </div>
    )
  }
}

export default Container;
