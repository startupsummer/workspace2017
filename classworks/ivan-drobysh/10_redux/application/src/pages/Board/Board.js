import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../main.css';
import { fetchIssues } from '../../resources/actions';

// import Header from './components/Header'
// import PageHead from './components/PageHead'
// import ListSubnav from './components/listing/ListSubnav';
// import ListHeader from './components/listing/ListHeader';
 import ListBody from './components/listBody/ListBody';
// import Description from './components/listing/Description';

class Board extends Component {

  componentDidMount() {
    this.props.fetchIssues();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            {
            //  <Header />
            }
          </div>
          <div className="content">
            {
            //  <PageHead count={this.state.issuesAll.length}/>
            }
            <div className="container">
              <div className="issues-listing">
                {
                //   <ListSubnav onClick={this.newOnClick} onChange={this.inputChange}/>
                // <ListHeader count={count} show={this.setShow} state={this.state.stateShow}/>
                // <Route path="/:id" component={(props) => <Description issues={this.state.issuesAll} {...props} />} />
              }
                <Route exact path="/" component={() => <ListBody />}/>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, {
  fetchIssues
})(Board);
