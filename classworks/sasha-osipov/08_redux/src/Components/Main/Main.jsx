import React, { Component } from 'react';
import './Main.css';
import Container from '../Container/Container';
import Pagehead from '../Pagehead/Pagehead';
import IssuesListing from '../IssuesListing/IssuesListing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Description from '../Description/Description';
import { connect } from 'react-redux';
import { fetchIssues } from '../../Resources/issues.actions';
import PropTypes from 'prop-types';
import fromStore from '../../Resources/issues.selectors';

class Main extends Component {
    
    static propsTypes = {
        fetchIssues: PropTypes.func.isRequired,
        issues: PropTypes.array.isRequired,
    }

    componentDidMount  = () => {
        this.props.fetchIssues();
    } 

    render() {
        const issues = this.props.issues;

        return (
            <Router>
                <main className="content">
                    <Pagehead count={ issues.length }/>
                    <Container>
                        <Route exact path="/" render={ () =>  <IssuesListing /> }/>
                        <Route path="/description/:descId" render={ (props) => <Description issues={ issues } id={ props.match.params.descId }/> }/>
                    </Container>
                </main>
            </Router>
        );
    }
}

export default connect(state => ({
    issues: fromStore.getIssues(state),
}), {
    fetchIssues,
})(Main);