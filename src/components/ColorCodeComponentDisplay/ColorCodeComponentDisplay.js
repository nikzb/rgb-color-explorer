import React, { Component } from 'react';

import './ColorCodeComponentDisplay.css';

class ColorCodeComponentDisplay extends Component {
  render() {
    return (
      <div className={this.props.className}>{this.props.codeAsString}</div>
    );
  }
}

export default ColorCodeComponentDisplay;
