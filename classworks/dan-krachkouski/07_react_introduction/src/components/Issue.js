import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button';

const issueSvg = <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>;

class Issue extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      action
    } = this.props;

    const svgClass = classNames(
      'issues__status', {
        'issues__status--open': data.state === 'open',
        'issues__status--closed': data.state === 'closed',
      });

    return (
      <li key={ data.id } className="issues__item">
        <div className={ svgClass }>
          { issueSvg }
        </div>
        <div className="issues__title">
          <a href="#" className="issues__link">{ data.title }</a>
        </div>
        <Button
          type="btn issue__close" click={ action(data.id) }>
            { data.state === 'open' ? 'Close issue' : 'Reopen' }
        </Button>
      </li>);
  }
}

Issue.propTypes = {
  data: PropTypes.object,
  action: PropTypes.func
}

export default Issue;
