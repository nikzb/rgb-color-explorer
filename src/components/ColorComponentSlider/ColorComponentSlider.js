import React, { Component } from 'react';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {
  render() {
    return (
      <div className='ColorComponentSlider__container'>
        <label className='ColorComponentSlider__label'>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range'/>
      </div>
    );
  }
}

export default ColorComponentSlider;
