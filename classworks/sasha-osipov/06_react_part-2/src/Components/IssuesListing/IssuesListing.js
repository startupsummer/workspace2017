import React, { Component } from 'react';
import IssuesSubnav from '../IssuesSubnav/IssuesSubnav';
import IssuesHeader from '../IssuesHeader/IssuesHeader';
import IssuesBody from '../IssuesBody/IssuesBody';
import './IssuesListing.css';

class IssuesListing extends Component {
    render() {
        return (
            <div className="issues-listing">
                <IssuesSubnav issues={ this.props.issues } newIssue={ this.props.newIssue } searchTitle={ this.props.searchTitle }/>
                <IssuesHeader issues={ this.props.issues } open={ this.props.open } closed={ this.props.closed }/>
                <IssuesBody issues={ this.props.issues } openItem={ this.props.openItem } closeItem={ this.props.closeItem } />
            </div>
        );
    }
}

export default IssuesListing;
