import React, { Component } from 'react';

import ButtonGroupMenu from '../ButtonGroupMenu/ButtonGroupMenu';
import { Colors, Button} from 'react-foundation';
import './BitsPerComponentControl.css';

class BitsPerComponentControl extends Component {
  render() {
    if (this.props.base === 2) {
      let button1classes;
      let button2classes;
      let button3classes;
      if (this.props.bitsPerComponent === 1) {
        button1classes = 'BitsPerComponentControl__button-3';
        button2classes = 'BitsPerComponentControl__button-3 hollow';
        button3classes = 'BitsPerComponentControl__button-3 hollow';
      } else if (this.props.bitsPerComponent === 2) {
        button1classes = 'BitsPerComponentControl__button-3 hollow';
        button2classes = 'BitsPerComponentControl__button-3';
        button3classes = 'BitsPerComponentControl__button-3 hollow';
      } else { // assuming (this.props.bitsPerComponent === 3)
        button1classes = 'BitsPerComponentControl__button-3 hollow';
        button2classes = 'BitsPerComponentControl__button-3 hollow';
        button3classes = 'BitsPerComponentControl__button-3';
      }
      return (
        <div className='BitsPerComponentControl__container'>
          <label className='BitsPerComponentControl__label'>Bits Per Component</label>
          <ButtonGroupMenu>
            <Button className={button1classes} color={Colors.SECONDARY}>1</Button>
            <Button className={button2classes} color={Colors.SECONDARY}>2</Button>
            <Button className={button3classes} color={Colors.SECONDARY}>3</Button>
          </ButtonGroupMenu>
        </div>
      );
    }
    else { // assuming (this.props.base === 16)
      let button1classes;
      let button2classes;
      if (this.props.bitsPerComponent === 4) {
        button1classes = 'BitsPerComponentControl__button-2';
        button2classes = 'BitsPerComponentControl__button-2 hollow';
      } else { // assuming (this.props.bitsPerComponent === 8) {
        button1classes = 'BitsPerComponentControl__button-2 hollow';
        button2classes = 'BitsPerComponentControl__button-2';
      }
      return (
        <div className='BitsPerComponentControl__container'>
          <label className='BitsPerComponentControl__label'>Bits Per Component</label>
          <ButtonGroupMenu>
            <Button className={button1classes} color={Colors.SECONDARY}>4</Button>
            <Button className={button2classes} color={Colors.SECONDARY}>8</Button>
          </ButtonGroupMenu>
        </div>
      );
    }

  }
}

export default BitsPerComponentControl;
