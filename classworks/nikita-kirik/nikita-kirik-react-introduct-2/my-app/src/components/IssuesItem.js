import React, { PureComponent } from 'react';
import ButtonHandle from './ButtonHandle';
import { Link } from 'react-router-dom';


class IssuesItem extends PureComponent {
  static propTypes = {
    itemData: React.PropTypes.object.isRequired,
    onIssueToogle: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.buttonLabel =
    this.props.itemData.state === 'open'
    ? 'Close'
    : 'Open';
  }

  toogleHandler = e => {
    this.props.onIssueToogle(this.props.itemData.id)
  };

  render() {
    const id = this.props.itemData.id;
    return (
      <li className="issues__item" key={this.props.itemData.id}>
        <div className="issues__status issues__status--open">
          <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
        </div>
        <div className="issues__title">
          <Link to={`/discription/${id}`} className="issues__link">
            {this.props.itemData.title}
          </Link>


        </div>

        <ButtonHandle onClick={this.toogleHandler}>
          {this.buttonLabel}
        </ButtonHandle>
      </li>
    )
  }
}

export default IssuesItem;
