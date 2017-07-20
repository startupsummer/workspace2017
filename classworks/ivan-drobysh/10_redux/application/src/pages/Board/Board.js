import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../main.css';
import { fetchIssues } from '../../resources/actions';
import PropTypes from 'prop-types';
import Header from './components/header/Header'
import PageHead from './components/pageHead/PageHead';
import ListSubnav from './components/listSubnav/ListSubnav';
import ListHeader from './components/listHeader/ListHeader';
import ListBody from './components/listBody/ListBody';
import Description from './components/description/Description';

class Board extends Component {

  componentDidMount() {
    this.props.fetchIssues();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <Header />
          </div>
          <div className="content">
            <PageHead />
            <div className="container">
              <div className="issues-listing">
                <ListSubnav />
                <ListHeader />
                <Route path="/:id" component={(props) => <Description issues={this.props.state.issues} {...props} />} />
                <Route exact path="/" component={() => <ListBody />}/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

Board.propTypes = {
  fetchIssues: PropTypes.func,
  state: PropTypes.object,
};

export default connect((state) => ({
  state
}), {
  fetchIssues
})(Board);
