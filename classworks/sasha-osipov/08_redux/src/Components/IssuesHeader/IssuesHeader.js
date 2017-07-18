import React, { Component } from 'react';
import Button from '../Button/Button';
import './IssuesHeader.css';
import { changeIssuesState } from '../../Resources/issues.actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fromStore from '../../Resources/issues.selectors';

class IssuesHeader extends Component {

    static propsTypes = {
        issues: PropTypes.array.isRequired,
        issuesState: PropTypes.string.isRequired,
        changeIssuesState: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired
    }

    openList = () => {
        this.props.changeIssuesState('open');
    }

    closedList = () => {
        this.props.changeIssuesState('closed');
    }

    render() {
        const issues = this.props.issues;
        const issuesState = this.props.issuesState;
        const value = this.props.value;
        const renderIssuse = issues.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        const openIssues = renderIssuse.filter(item => item.state === 'open').length;
        const closeIssues = renderIssuse.filter(item => item.state === 'closed').length;

        return (
            <div className="issues-listing__header">
                <div className="issues-listing__states">
                    <Button link click={ this.openList } selected={ issuesState === 'open' } 
                    text={`Open ${ openIssues }`}/>

                    <Button link click={ this.closedList } selected={ issuesState === 'closed' } 
                    text={`Closed ${ closeIssues }`}/>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
  issuesState: fromStore.getIssuesState(state),
  value: fromStore.getValue(state),
}), {
    changeIssuesState,
})(IssuesHeader);

