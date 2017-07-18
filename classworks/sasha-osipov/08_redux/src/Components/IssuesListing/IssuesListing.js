import React, { Component } from 'react';
import IssuesSubnav from '../IssuesSubnav/IssuesSubnav';
import IssuesHeader from '../IssuesHeader/IssuesHeader';
import IssuesBody from '../IssuesBody/IssuesBody';
import './IssuesListing.css';

class IssuesListing extends Component {
    render() {
        return (
            <div className="issues-listing">
                <IssuesSubnav />
                <IssuesHeader />
                <IssuesBody />
            </div>
        );
    }
}

export default IssuesListing;
