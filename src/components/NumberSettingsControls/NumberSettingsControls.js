import React, { Component } from 'react';

import NumberSystemControl from '../NumberSystemControl/NumberSystemControl';
import BitsPerComponentControl from '../BitsPerComponentControl/BitsPerComponentControl';
import './NumberSettingsControls.css';

class NumberSettingsControls extends Component {
  render() {
    return (
      <div className='NumberSettingsControls__container'>
        <NumberSystemControl base={this.props.colorCode.base} onColorChange={this.props.onColorChange}/>
        <BitsPerComponentControl base={this.props.colorCode.base} bitsPerComponent={this.props.colorCode.bits / 3} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default NumberSettingsControls;
