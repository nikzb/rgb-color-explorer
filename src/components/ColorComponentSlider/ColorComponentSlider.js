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

  // returns a function that can be used to call onColorChange with the given component
  // @param comp - color component ('R', 'G', or 'B')
  // @param oldValue - the current value of the component that will be adjusted when a button is clicked
  updateColor(comp, oldValue) {
    return (changeByAmount) => {
      this.props.onColorChange({
        comp,
        newValue: oldValue + changeByAmount
      })
    };
  }

  render() {
    const labelClassNames = `ColorComponentSlider__label ColorComponentSlider__label--${this.props.colorComp.toLowerCase()}`;
    const containerClassNames = `ColorComponentSlider__container ColorComponentSlider__container--${this.props.colorComp.toLowerCase()}`;

    return (
      <div className={containerClassNames}>
        <label className={labelClassNames}>{this.props.colorComp}</label>
        <input className='ColorComponentSlider__slider' type='range' min={0} max={this.props.max} value={this.props.intensity} step={1} onChange={this.handleChange}/>
        <UpDownControl onClick={this.updateColor(this.props.colorComp.charAt(0), this.props.intensity)}/>
      </div>
    );
  }
}

export default ColorComponentSlider;
