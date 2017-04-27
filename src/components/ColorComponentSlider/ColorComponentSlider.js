import React, { Component } from 'react';
import UpDownControl from '../UpDownControl/UpDownControl';

import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.props.onColorChange({
      comp: this.props.colorComp.charAt(0),
      newValue: parseInt(e.target.value, 10)
    });
  }

  render() {
    const labelClassNames = `ColorComponentSlider__label ColorComponentSlider__label--${this.props.colorComp.toLowerCase()}`;
    const containerClassNames = `ColorComponentSlider__container ColorComponentSlider__container--${this.props.colorComp.toLowerCase()}`;

    return (
      <div className={containerClassNames}>
        <label className={labelClassNames}>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range' min={0} max={this.props.max} defaultValue={this.props.intensity} step={1} onChange={this.handleChange}/>
        <UpDownControl />
      </div>
    );
  }
}

export default ColorComponentSlider;
