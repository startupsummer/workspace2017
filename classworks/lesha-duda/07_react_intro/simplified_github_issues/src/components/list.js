import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MyButton from './button.js';
import ListItem from './listItem.js';


class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.listData;
    let tempData = [];

    if(this.props.sortField.length > 0) {
      tempData = data
        .filter((item) => item.title.toLowerCase()
          .includes(this.props.sortField.toLowerCase()) === true);
    }

    if(this.props.sortField.length > 0) (data = tempData)

    let temp = data.map((item) => {
      if(item.state === this.props.state || this.props.state === 'all') {
        return (
            <li className="issues__item">
              <div className="issues__status issues__status--open">
                <svg className="issues__icon" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
              </div>
              <div className="issues__title">
                <a href="#" className="issues__link">
                  <Link to={`/${item.id}`}>{item.title}</Link>
                </a>
              </div>

              {item.state === 'open'
                ? <MyButton className="btn issue__close" type="button"
                    handler={this.props.handler(item.number)} value="Close issue"
                    id={item.id}
                  />
                : null
              }
            </li>
          )
        }
      }
    );

    return (
      <div className="issues-listing__body">
          <ul className="issues">
            {temp}
          </ul>
        </div>
    )
  }
}

export default List;
