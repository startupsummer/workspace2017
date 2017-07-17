import React, { PureComponent } from 'react';

class IssueDiscription extends PureComponent {
  render() {
    let discription = 'gfgf';
    console.log(this.props.data);

    this.props.data.forEach(it => {
      console.log(it.id + " " + this.props.match.params.id + " " + (it.id == this.props.match.params.id));
      console.log(discription);
      // (it.id === this.props.match.params.id) && (discription = it.title);
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
