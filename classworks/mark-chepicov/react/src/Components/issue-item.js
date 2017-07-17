import React, { Component } from 'react';
import '../main.css';
import Button from './button.js';

class IssueItem extends Component {
  
  static propTypes = {
    state: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    issueId: React.PropTypes.number.isRequired,
    openButton: React.PropTypes.func.isRequired,
    closeButton: React.PropTypes.func.isRequired,
  }

  constructor(props){
    super(props);
  }

  render() {
    const {
      state,
      title,
      issueId,
      openButton,
      closeButton,
    } = this.props;
    return (
      <li key={this.props.key} className="issues__item">
        <div className={`issues__status ${this.props.state === 'open' ? 'issues__status--open' : ''}`}>
          <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
        </div>
        <div className="issues__title">
          <a href="#" className="issues__link">
            {this.props.title}
          </a>
        </div>
        <Button className="issue__close" type="button" issueId={this.props.issueId} text={`${this.props.state === 'open' ? 'Close issue' : 'Open issue'}`}
         click = {this.props.state === "closed" ? this.props.openButton : this.props.closeButton}/>
      </li>
    );
  }
}

export default IssueItem;
