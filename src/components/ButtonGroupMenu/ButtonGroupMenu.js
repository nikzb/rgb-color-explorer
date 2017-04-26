import React, { Component } from 'react';
// import { ButtonGroup, Sizes } from 'react-foundation';
import './ButtonGroupMenu.css';

class ButtonGroupMenu extends Component {
  render() {
    const buttons = this.props.buttons;
    const buttonList = buttons.map((button) => {
      return <button key={button.label} className={`button ${button.classes}`}>{button.label}</button>
    });
    let buttonGroupMenuClasses = 'ButtonGroupMenu';
    if (this.props.size) {
      buttonGroupMenuClasses += `--${this.props.size}`;
    }

    return (
      <div className={buttonGroupMenuClasses} data-mobile-app-toggle>
        {buttonList}
      </div>
    );
  }

  // render() {
  //   let size = Sizes.BASIC;
  //   if (this.props.size) {
  //     if (this.props.size === 'tiny') {
  //       size = Sizes.TINY;
  //     } else if (this.props.size === 'small') {
  //       size = Sizes.SMALL;
  //     } else if (this.props.size === 'large') {
  //       size = Sizes.LARGE;
  //     }
  //   }
  //
  //   return (
  //     <ButtonGroup className='ButtonGroupMenu__button-group' size={size}>
  //       {this.props.children}
  //     </ButtonGroup>
  //   );
  // }

}

export default ButtonGroupMenu;
