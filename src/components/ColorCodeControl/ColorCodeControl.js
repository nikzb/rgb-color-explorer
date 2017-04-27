import React, { Component } from 'react';
// import ColorCode from '../../classes/ColorCode/ColorCode';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.props.onColorChange({
      newCode: e.target.value
    });
  }

  render() {
    const colorCode = this.props.colorCode;
    return (
      <div className='ColorCodeControl__container'>
        <label className='ColorCodeControl__label'>RGB Color Code</label>
        <input className='ColorCodeControl__input' type='text' value={colorCode.getCode()} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default ColorCodeControl;
