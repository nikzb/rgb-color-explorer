import React, { Component } from 'react';
import { ButtonGroup, Sizes } from 'react-foundation';
// import './ButtonGroup.css';

class ButtonGroupMenu extends Component {
  render() {
    let size = Sizes.BASIC;
    if (this.props.size) {
      if (this.props.size === 'tiny') {
        size = Sizes.TINY;
      } else if (this.props.size === 'small') {
        size = Sizes.SMALL;
      } else if (this.props.size === 'large') {
        size = Sizes.LARGE;
      }
    }

    return (
      <ButtonGroup className='ButtonGroupMenu__button-group' size={size}>
        {this.props.children}
      </ButtonGroup>
    );
  }
}

export default ButtonGroupMenu;
