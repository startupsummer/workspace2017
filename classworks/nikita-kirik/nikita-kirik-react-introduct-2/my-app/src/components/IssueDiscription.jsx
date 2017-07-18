import React, { PureComponent } from 'react';

class IssueDiscription extends PureComponent {
  render() {
    let discription ;
    this.props.data.forEach(it => {
      (it.id == this.props.match.params.id) ? discription = it.title : null;
    });

    return(
      <div className="discription">
        <div className="discription__title"> DISCRIPTION </div>
        {discription}
      </div>
    );
  }
}

export default IssueDiscription;
