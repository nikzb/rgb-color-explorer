import React, { Component } from 'react';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {

  render() {
    const labelClassNames = `ColorComponentSlider__label ColorComponentSlider__label-${this.props.colorComp.toLowerCase()}`;

    return (
      <div className='ColorComponentSlider__container'>
        <label className={labelClassNames}>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range'/>
      </div>
    );
  }
}

export default ColorComponentSlider;
