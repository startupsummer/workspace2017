import React, { Component } from 'react';
import IssuesItem from '../IssuesItem/IssuesItem';
import './IssuesBody.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fromStore from '../../Resources/issues.selectors';

class IssuesBody extends Component {

    static propsTypes = {
        issues: PropTypes.array.isRequired,
        issuesState: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }

    render() {
        const issues = this.props.issues;
        const issuesState = this.props.issuesState;
        const value = this.props.value;
        const renderIssues = issues.filter(item => item.state === issuesState && item.title.toLowerCase().includes(value.toLowerCase()));

        return (
            <div className="issues-listing__body">
                <ul className="issues">
                    { renderIssues.length !==0 ? renderIssues.map(item => <IssuesItem key={ item.id } id={ item.id }
                    title={ item.title } />) :
                    <li className="issues__item">{ issuesState === 'open' ? 'No open issues' : 'No closed item' }</li>}
                </ul>
            </div>
        );
    }
}

export default connect(state => ({
  issues: fromStore.getIssues(state),
  issuesState: fromStore.getIssuesState(state),
  value: fromStore.getValue(state)
}))(IssuesBody);

