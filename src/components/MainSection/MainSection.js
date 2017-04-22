import React, { Component } from 'react';

class MainSection extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default MainSection;
