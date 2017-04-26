import React, { Component } from 'react';

import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
// import { Colors, Button} from 'react-foundation';
import './BitsPerComponentControl.css';

class BitsPerComponentControl extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // Call the function passed down from parent that updates the code correctly
  }

  render() {
    let binaryButtons = [{label: '1'}, {label: '2'}, {label: '3'}];
    let hexButtons = [{label: '4'}, {label: '8'}];

    if (this.props.base === 2) {
      if (this.props.bitsPerComponent === 1) {
        binaryButtons[0].classes = 'BitsPerComponentControl__button-3 is-active';
        binaryButtons[1].classes = 'BitsPerComponentControl__button-3';
        binaryButtons[2].classes = 'BitsPerComponentControl__button-3';
      } else if (this.props.bitsPerComponent === 2) {
        binaryButtons[0].classess = 'BitsPerComponentControl__button-3';
        binaryButtons[1].classes = 'BitsPerComponentControl__button-3 is-active';
        binaryButtons[2].classes = 'BitsPerComponentControl__button-3';
      } else { // assuming (this.props.bitsPerComponent === 3)
        binaryButtons[0].classes = 'BitsPerComponentControl__button-3';
        binaryButtons[1].classes = 'BitsPerComponentControl__button-3';
        binaryButtons[2].classes = 'BitsPerComponentControl__button-3 is-active';
      }
      return (
        <div className='BitsPerComponentControl__container'>
          <label className='BitsPerComponentControl__label'>Bits Per Component</label>
          <ButtonGroupMenu buttons={binaryButtons}>
            {/* <Button className={button1classes} onClick={this.handleClick} color={Colors.SECONDARY}>1</Button>
            <Button className={button2classes} onClick={this.handleClick} color={Colors.SECONDARY}>2</Button>
            <Button className={button3classes} onClick={this.handleClick} color={Colors.SECONDARY}>3</Button> */}
          </ButtonGroupMenu>
        </div>
      );
    }
    else { // assuming (this.props.base === 16)
      if (this.props.bitsPerComponent === 4) {
        hexButtons[0].classes = 'BitsPerComponentControl__button-2 is-active';
        hexButtons[1].classes = 'BitsPerComponentControl__button-2';
      } else { // assuming (this.props.bitsPerComponent === 8) {
        hexButtons[0].classes = 'BitsPerComponentControl__button-2';
        hexButtons[1].classes = 'BitsPerComponentControl__button-2 is-active';
      }
      return (
        <div className='BitsPerComponentControl__container'>
          <label className='BitsPerComponentControl__label'>Bits Per Component</label>
          <ButtonGroupMenu buttons={hexButtons} />
        </div>
      );
    }

  }
}

export default BitsPerComponentControl;
