import React, { Component } from 'react';

import NumberSystemControl from '../NumberSystemControl/NumberSystemControl';
import BitsPerComponentControl from '../BitsPerComponentControl/BitsPerComponentControl';
import './NumberSettingsControls.css';

class NumberSettingsControls extends Component {
  render() {
    return (
      <div className='NumberSettingsControls__container'>
        <NumberSystemControl base={16}/>
        <BitsPerComponentControl base={16} bitsPerComponent={8}/>
      </div>
    );
  }
}

export default NumberSettingsControls;
