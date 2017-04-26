import React, { Component } from 'react';
import UpDownControl from '../UpDownControl/UpDownControl';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {

  render() {
    const labelClassNames = `ColorComponentSlider__label ColorComponentSlider__label--${this.props.colorComp.toLowerCase()}`;
    const containerClassNames = `ColorComponentSlider__container ColorComponentSlider__container--${this.props.colorComp.toLowerCase()}`;
    return (
      <div className={containerClassNames}>
        <label className={labelClassNames}>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range'/>
        <UpDownControl />
      </div>
    );
  }
}

export default ColorComponentSlider;
