import React, { Component } from 'react';
import './Main.css';
import Container from '../Container/Container';
import Pagehead from '../Pagehead/Pagehead';
import IssuesListing from '../IssuesListing/IssuesListing';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Description from '../Description/Description';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            tab: 'open',
            value: '',
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/repos/Fusionqq/GitHub-Issues/issues?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3&state=all')
        .then(response => response.json())
        .then((data) => {
            const issuesList = data.map(item => ({
                id: item.id,
                description: item.body,
                title: item.title,
                state: item.state,
                number: item.number,
            }));
            this.setState({
                issues: issuesList,
            })
        }) 
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
        const issue = this.state.issues.filter(item => item.id === id)[0]

        fetch(`https://api.github.com/repos/Fusionqq/GitHub-Issues/issues/${issue.number}?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3`, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'open',
            })
        })
        .then(response => response.json())
        .then(() => {
            this.setState({
                issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'open'} : item),
            })
        })
    }

    closeItem = (id) => () => {
        const issue = this.state.issues.filter(item => item.id === id)[0]

        fetch(`https://api.github.com/repos/Fusionqq/GitHub-Issues/issues/${issue.number}?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3`, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'closed',
            })
        })
        .then(response => response.json())
        .then(() => {
            this.setState({
                issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'closed'} : item),
            })
        })
    }

    newIssue = () => {
        const newItem = {
            state : "open",
            title : "Hello, it's me",
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel suscipit leo. Mauris ultricies, leo sit amet accumsan ultricies, arcu ipsum tempus libero, non tincidunt arcu est ac elit.`,
        }

        fetch(`https://api.github.com/repos/Fusionqq/GitHub-Issues/issues?access_token=39b27afcbfd15dda6d0cd88c02936095fb462ee3`, {
            method: 'POST',
            body: JSON.stringify(newItem),
        })
        .then(response => response.json())
        .then((data) => {
            const newIssues = [...this.state.issues, data];
            this.setState({
                issues: newIssues,
            })
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