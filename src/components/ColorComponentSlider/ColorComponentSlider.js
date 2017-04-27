import React, { Component } from 'react';
import UpDownControl from '../UpDownControl/UpDownControl';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onColorChange({
      comp: this.props.colorComp.charAt(0),
      newValue: e.target.value
    });
  }

  render() {
    const labelClassNames = `ColorComponentSlider__label ColorComponentSlider__label--${this.props.colorComp.toLowerCase()}`;
    const containerClassNames = `ColorComponentSlider__container ColorComponentSlider__container--${this.props.colorComp.toLowerCase()}`;
    console.log(this.props.sliderStep);
    return (
      <div className={containerClassNames}>
        <label className={labelClassNames}>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range' min={0} max={255} defaultValue={this.props.intensity} step={this.props.sliderStep} onChange={this.handleChange}/>
        <UpDownControl />
      </div>
    );
  }
}

export default ColorComponentSlider;
