import React, { Component } from 'react';
// import ColorCode from '../../classes/ColorCode/ColorCode';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  handleChange(e) {
    let codeToUse;
    if (this.props.colorCode.getBase() === 2) {
      codeToUse = e.target.value;
    } else if (this.props.colorCode.getBase() === 16) {
      codeToUse = e.target.value.slice(1, e.target.value.length);
    }
    this.props.onColorChange({
      newCode: codeToUse,
      base: this.props.colorCode.base,
      bits: this.props.colorCode.bits
    });
  }

  handleOnFocus() {
    console.log('input focus');
    const colorCode = this.props.colorCode;
    // console.log(this.props.onFocusChange);
    this.props.onFocusChange.setToCodeEditMode();

    // Select the code so that the user can type or use button panel to replace it
    // For hex, start at index 1 so that you leave the # symbol in place
    let startIndex;
    let endIndex;
    if (colorCode.getBase() === 2) {
      startIndex = 0;
      endIndex = colorCode.getCode().length;
    } else if (colorCode.getBase() === 16) {
      startIndex = 1;
      endIndex = colorCode.getCode().length + 1;
    }
    this.textInput.setSelectionRange(startIndex, endIndex);
  }

  handleOnBlur() {
    console.log('input lost focus');
    this.props.onFocusChange.setToSliderMode();
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

  render() {
    return (
      <div className='ColorCodeControl__container'>
        <label className='ColorCodeControl__label'>RGB Color Code</label>
        <input className='ColorCodeControl__input' type='text' ref={(input) => { this.textInput = input; }} value={this.getCode()} onChange={this.handleChange} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur}/>
      </div>
    );
  }
}

export default ColorCodeControl;
