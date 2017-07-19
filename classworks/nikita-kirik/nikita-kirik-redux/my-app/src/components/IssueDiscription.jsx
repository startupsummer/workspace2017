import React, { PureComponent } from 'react';

class IssueDiscription extends PureComponent {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
  }

  render() {
    let discription;
    const id = this.props.match.params.id;
    this.props.data.forEach(it => {
      (it.id == id) ? discription = it.title : null;
    });
    return (
      <div className="discription">
        <div className="discription__title"> DISCRIPTION </div>
        {discription}
      </div>
    );
  }
}

export default IssueDiscription;
