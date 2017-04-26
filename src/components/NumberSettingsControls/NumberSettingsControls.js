import React, { Component } from 'react';

import NumberSystemControl from '../NumberSystemControl/NumberSystemControl';
import BitsPerComponentControl from '../BitsPerComponentControl/BitsPerComponentControl';
import './NumberSettingsControls.css';

class NumberSettingsControls extends Component {
  render() {
    return (
      <div className='NumberSettingsControls__container'>
        <NumberSystemControl base={2}/>
        <BitsPerComponentControl base={2} bitsPerComponent={1}/>
      </div>
    );
  }
}

export default NumberSettingsControls;
