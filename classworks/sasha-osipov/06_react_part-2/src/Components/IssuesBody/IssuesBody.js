import React, { Component } from 'react';
import IssuesItem from '../IssuesItem/IssuesItem';
import './IssuesBody.css';

class IssuesBody extends Component {
    render() {
        const issues = this.props.issues;
        const renderIssues = issues.issues.filter(item => item.state === issues.tab && item.title.toLowerCase().includes(issues.value.toLowerCase()));

        return (
            <div className="issues-listing__body">
                <ul className="issues">
                    { renderIssues.length !==0 ? renderIssues.map(item => <IssuesItem key={ item.id } id={ item.id } title={ item.title } tab={ issues.tab }
                    openItem={ this.props.openItem } closeItem={ this.props.closeItem } />) : <li className="issues__item">
                    { issues.tab === 'open' ? 'No open issues' : 'No closed item' }</li> }
                </ul>
            </div>
        );
    }
}

export default IssuesBody;