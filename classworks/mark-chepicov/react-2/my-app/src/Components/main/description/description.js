import '../../../main.css';
import React, {PureComponent} from 'react';

class Description extends PureComponent{
  render(){
    const {item} = this.props;
    return (
      <div className="issue__description">
        <div className="issue__title">
          <h2>{item.title}</h2>
        </div>
        <div className="issue__text">
          {item.body}
        </div>
      </div>
    )
  }
}

Description.propTypes = {
  item: React.PropTypes.object.isRequired,
}

export default Description;