import React, { Component } from 'react';
import Button from '../Button/Button';
import './IssuesHeader.css';

class IssuesHeader extends Component {
    render() {
        const issues = this.props.issues;
        const renderIssues = issues.issues.filter(item => item.state === issues.tab);
        const count = issues.issues.length - renderIssues.length;

        return (
            <div className="issues-listing__header">
                <div className="issues-listing__states">
                    <Button link selected={ issues.tab === 'open' } text={`Open ${ issues.tab === 'open' ? renderIssues.length : count }`} click={ this.props.open }>
                    </Button>

                    <Button link selected={ issues.tab === 'closed' } text={`Closed ${ issues.tab === 'closed' ? renderIssues.length : count }`} click={ this.props.closed }>
                    </Button>
                </div>
            </div>
        );
    }
}

export default IssuesHeader;