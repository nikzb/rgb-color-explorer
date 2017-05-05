import React, { Component } from 'react';
import _ from 'lodash';
// import ColorCode from '../../classes/ColorCode/ColorCode';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.handleOnFocus = this.handleOnFocus.bind(this);
    // this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleChange(e) {
    const colorCode = this.props.colorCode;

    let codeToUse;
    if (colorCode.getBase() === 2) {
      codeToUse = e.target.value;
      if (codeToUse.length > colorCode.getBits()) {
        codeToUse = codeToUse.slice(0, colorCode.getBits());
      }

      const validBinarySymbols = ['0', '1'];
      // Clean out bad characters and digits
      let cleanCode = '';
      for (let i = 0; i < codeToUse.length; i += 1) {
        if (_.includes(validBinarySymbols, codeToUse.charAt(i))) {
          cleanCode += codeToUse.charAt(i);
        }
      }
      codeToUse = cleanCode;
    } else if (colorCode.getBase() === 16) {
      codeToUse = e.target.value.slice(1, e.target.value.length);
      if (codeToUse.length > colorCode.getBits() / 4) {
        codeToUse = codeToUse.slice(0, colorCode.getBits() / 4);
      }
      const validHexSymbols = ['0', '1', '2', '3', '4', '5', '6', '7',
                                  '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
      // Clean out bad characters and digits
      let cleanCode = '';
      for (let i = 0; i < codeToUse.length; i += 1) {
        if (_.includes(validHexSymbols, codeToUse.charAt(i))) {
          cleanCode += codeToUse.charAt(i);
        }
      }
      codeToUse = cleanCode;
    }

    this.props.onColorChange({
      newCode: codeToUse,
      base: this.props.colorCode.base,
      bits: this.props.colorCode.bits
    });
  }

  getCode() {
    const colorCode = this.props.colorCode;
    const codeToShow = colorCode.getCode();
    if (colorCode.getBase() === 2) {
      return codeToShow;
    } else {
      return `#${codeToShow}`;
    }
  }

  componentDidUpdate() {
    // debugger;
    console.log('in componentDidUpdate in ColorCodeControl');

    // need to put the cursor back in the right place if using button panel or typing values in
    if (this.props.inCodeEditMode) {

      const input = this.props.codeInputElement;
      input.focus();
      console.log('setting selection range ' + this.props.cursorPosition);
      // input.setSelectionRange(this.props.cursorPosition);
    }
  }

  render() {
    return (
      <div className='ColorCodeControl__container'>
        <label className='ColorCodeControl__label'>RGB Color Code</label>
        <input className='ColorCodeControl__input' type='text' ref={this.props.codeInputRef} value={this.getCode()} onChange={this.handleChange} onFocus={this.props.onFocus}/>

      </div>
    );
  }
}

export default ColorCodeControl;
