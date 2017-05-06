import React, { Component } from 'react';
import _ from 'lodash';
import ColorCodeComponentDisplay from '../ColorCodeComponentDisplay/ColorCodeComponentDisplay';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    let classNameRed = 'ColorCodeComponentDisplay';
    let classNameGreen = 'ColorCodeComponentDisplay';
    let classNameBlue = 'ColorCodeComponentDisplay';

    const colorCode = this.props.colorCode;
    let codeAsString;

    if (colorCode.isPartial) {
      codeAsString = colorCode.getPartial();
      classNameRed += ' ColorCodeComponentDisplay--red';
      classNameGreen += ' ColorCodeComponentDisplay--green';
      classNameBlue += ' ColorCodeComponentDisplay--blue';
    } else {
      codeAsString = colorCode.getCode();
      if (this.props.inCodeEditMode) {
        classNameRed += ' ColorCodeComponentDisplay--placeholder';
        classNameGreen += ' ColorCodeComponentDisplay--placeholder';
        classNameBlue += ' ColorCodeComponentDisplay--placeholder';
      } else {
        classNameRed += ' ColorCodeComponentDisplay--red';
        classNameGreen += ' ColorCodeComponentDisplay--green';
        classNameBlue += ' ColorCodeComponentDisplay--blue';
      }
    }

    let redCompString = '';
    let greenCompString = '';
    let blueCompString = '';

    if (colorCode.getFullCodeLength() === 3) {
      if (codeAsString.length === 3) {
        redCompString = codeAsString.slice(0, 1);
        greenCompString = codeAsString.slice(1, 2);
        blueCompString = codeAsString.slice(2, 3);
      } else if (codeAsString.length === 2) {
        redCompString = codeAsString.slice(0, 1);
        greenCompString = codeAsString.slice(1, 2);
      } else if (codeAsString.length === 1) {
        redCompString = codeAsString.slice(0, 1);
      }
    } else if (colorCode.getFullCodeLength() === 6) {
      if (codeAsString.length === 6) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
        blueCompString = codeAsString.slice(4, 6);
      } else if (codeAsString.length === 5) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
        blueCompString = codeAsString.slice(4, 5);
      } else if (codeAsString.length === 4) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 4);
      } else if (codeAsString.length === 3) {
        redCompString = codeAsString.slice(0, 2);
        greenCompString = codeAsString.slice(2, 3);
      } else if (codeAsString.length === 2) {
        redCompString = codeAsString.slice(0, 2);
      } else if (codeAsString.length === 1) {
        redCompString = codeAsString.slice(0, 1);
      }
    }

    return (
      <div className='ColorCodeControl__container'>
        <label className='ColorCodeControl__label'>RGB Color Code</label>
        <div className='ColorCodeComponentDisplay__container' tabIndex={2}>
          <ColorCodeComponentDisplay className={classNameRed} codeAsString={redCompString} />
          <ColorCodeComponentDisplay className={classNameGreen} codeAsString={greenCompString} />
          <ColorCodeComponentDisplay className={classNameBlue} codeAsString={blueCompString} />
        </div>
      </div>
    );
  }
}

export default ColorCodeControl;
