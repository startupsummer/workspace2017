import React, { Component } from 'react';
import './Main.css';
import Container from '../Container/Container';
import Pagehead from '../Pagehead/Pagehead';
import IssuesListing from '../IssuesListing/IssuesListing';
import data from '../../data';

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
            "id": Math.random()*1000000000,
            "state" : "open",
            "title" : "Hello, it's me",
        };
        const newIssues = [...this.state.issues, newItem];
        this.setState({
            issues: newIssues,
        })
    }

    searchTitle = (event) => {
        this.setState({
            value: event.target.value,
        });
        console.log(event.target.value);
    }

    render() {
        return (
            <main className="content">
                <Pagehead count={ this.state.issues.length }/>
                <Container>
                    <IssuesListing issues={ this.state } open={ this.openList } closed={ this.closedList } 
                    openItem={ this.openItem } closeItem={ this.closeItem } newIssue={ this.newIssue } searchTitle={ this.searchTitle }/>
                </Container>
            </main>
        );
    }
}

export default Main;