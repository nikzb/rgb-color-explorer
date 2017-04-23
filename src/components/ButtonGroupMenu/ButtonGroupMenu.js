import React, { Component } from 'react';
import { ButtonGroup } from 'react-foundation';
// import './ButtonGroup.css';

class ButtonGroupMenu extends Component {
  render() {
    return (
      <ButtonGroup>
        {this.props.children}
      </ButtonGroup>
    );
  }
}

export default ButtonGroupMenu;
