import React, { Component } from 'react';

import './ColorToggleButton.css';

class ColorToggleButton extends Component {

  render() {
    let classNames = `button ColorToggleButton ColorToggleButton--${this.props.colorComp.toLowerCase()}`;

    if (this.props.toggledOff) {
      classNames += ' ColorToggleButton--toggled-off';
    }

    return (
      <button className={classNames} onClick={this.props.onClick}>{this.props.colorComp}</button>
    );
  }
}

export default ColorToggleButton;
