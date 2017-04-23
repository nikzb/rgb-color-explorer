import React, { Component } from 'react';

import './ColorCodeControl.css';

class ColorCodeControl extends Component {
  render() {
    return (
      <div className='ColorCodeControl__container'>
        <label className='ColorCodeControl__label'>RGB Color Code</label>
        <input className='ColorCodeControl__input' type='text'></input>
      </div>
    );
  }
}

export default ColorCodeControl;
