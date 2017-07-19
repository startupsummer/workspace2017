import React, { Component } from 'react';
import './Description.css';

class Description extends Component {
    render() {
        const issues = this.props.issues;
        const id = +this.props.id;

        const currentIssues = issues.filter( item => item.id === id )[0];

        return (
            <div className="description">
                <a to="/description" className="description__title">
                    { currentIssues.title }
                </a>
                <p>
                    { currentIssues.description }
                </p>
            </div>
        );
    }
}

export default Description;