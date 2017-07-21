import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IssuesItem from './IssuesItem';
import { issuesSelector } from '../resources/issue/issue.selectors';

class IssuesListeningBody extends Component {
  render() {
    const { text, data, issuesType } = this.props;
    const listItems = data
      .filter(
        it => issuesType === it.state && it.title.includes(text)
      )
      .map(it => <IssuesItem key={it.id} itemData={it} data={data} />);
    return (
      <ul className="issues">
        {listItems}
      </ul>
    );
  }
}

IssuesListeningBody.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  issuesType: PropTypes.string.isRequired,
}

export default connect(
  (state, props) => ({
    data: issuesSelector(state),
  })
)(IssuesListeningBody);
