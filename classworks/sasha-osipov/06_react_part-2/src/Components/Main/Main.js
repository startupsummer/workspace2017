import React, { Component } from 'react';
import './Main.css';
import Container from '../Container/Container';
import Pagehead from '../Pagehead/Pagehead';
import IssuesListing from '../IssuesListing/IssuesListing';
import data from '../../data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Description from '../Description/Description';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: data,
            tab: 'open',
            value: '',
        }
    }

    openList = () => {
        this.setState({
            tab: 'open',
        })
    }

    closedList = () => {
        this.setState({
            tab: 'closed',
        })
    }

    openItem = (id) => () => {
        this.setState({
            issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'open'} : item),
        })
    }

    closeItem = (id) => () => {
        this.setState({
            issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'closed'} : item),
        })
    }

    newIssue = () => {
        const newItem = {
            id: Math.random()*1000000000,
            state : "open",
            title : "Hello, it's me",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel su
                    scipit leo. Mauris ultricies, leo sit amet accumsan ultricies, arcu 
                    ipsum tempus libero, non tincidunt arcu est ac elit.`,
        };
        const newIssues = [...this.state.issues, newItem];
        this.setState({
            issues: newIssues,
        })
    }

    searchTitle = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    render() {
       
        return (
            <Router>
                <main className="content">
                    <Pagehead count={ this.state.issues.length }/>
                    <Container>
                        <Route exact path="/" render={ () =>  <IssuesListing issues={ this.state } open={ this.openList } closed={ this.closedList } 
                        openItem={ this.openItem } closeItem={ this.closeItem } newIssue={ this.newIssue } searchTitle={ this.searchTitle }/> }/>
                        <Route path="/description/:descId" render={ (props) => <Description issues={ this.state } id={ props.match.params.descId }/> }/> 
                    </Container>
                </main>
            </Router>
        );
    }
}

export default Main;