import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListingSubnav from './ListingSubnav';
import ListingHeader from './ListingHeader';
import ListingBody from './ListingBody';
import IssueDescription from './IssueDescription'; 
import PropTypes from 'prop-types';

class Container extends Component {
  componentWillMount() { 
    fetch('https://api.github.com/repos/filipochka97/react-github/issues?access_token=c8c50b1970bdd6f537626534103dba0a5dfb4b88')
      .then(response => response.json())
      .then(data => this.setState({
        items: data,
      })
    );
  }
  
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
    const options = {
      method: 'POST',
      body: JSON.stringify({title: `Something went wrong with my mind ${~~(Math.random() * 200)}`})
    }

    fetch('https://api.github.com/repos/filipochka97/react-github/issues?access_token=c8c50b1970bdd6f537626534103dba0a5dfb4b88', options)
      .then(response => response.json())
      .then((data) => {
        this.props.allIssuesNumber(this.state.items.length + 1);
        const { id, title, state } = data;
        const items = this.state.items;
        const newItems = [
          ...items,
          {
            id,
            title,
            state
          }
        ];

        this.setState({
          items: newItems,
          initialItems: newItems,
        });
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
