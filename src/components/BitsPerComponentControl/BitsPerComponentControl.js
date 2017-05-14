import React, { Component } from 'react';

import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
// import { Colors, Button} from 'react-foundation';
import './BitsPerComponentControl.css';

class BitsPerComponentControl extends Component {
  // Return a function that can be called when one of the bits per component buttons is clicked
  // @param newBitsPerComponent - the bitsPerComponent to use in the new ColorCode
  onButtonClick(newBitsPerComponent) {
    return () => {
      if (newBitsPerComponent !== this.props.bitsPerComponent) {
        this.props.onColorChange({newBitsPerComponent});
      }
    }
  }

  render() {
    let binaryButtons = [
      {label: '3', onClick: this.onButtonClick(1)},
      {label: '6', onClick: this.onButtonClick(2)},
    ];
    let hexButtons = [
      {label: '12', onClick: this.onButtonClick(4)},
      {label: '24', onClick: this.onButtonClick(8)}
    ];

    if (this.props.base === 2) {
      if (this.props.bitsPerComponent === 1) {
        binaryButtons[0].classes = 'BitsPerComponentControl__button-2 is-active';
        binaryButtons[1].classes = 'BitsPerComponentControl__button-2';
      } else if (this.props.bitsPerComponent === 2) {
        binaryButtons[0].classes = 'BitsPerComponentControl__button-2';
        binaryButtons[1].classes = 'BitsPerComponentControl__button-2 is-active';
      }
      return (
        <div className='BitsPerComponentControl__container'>
          <label className='BitsPerComponentControl__label'>Number of Bits</label>
          <ButtonGroupMenu buttons={binaryButtons} />
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
          <label className='BitsPerComponentControl__label'>Number of Bits</label>
          <ButtonGroupMenu buttons={hexButtons} />
        </div>
      );
    }

  }
}

export default BitsPerComponentControl;
