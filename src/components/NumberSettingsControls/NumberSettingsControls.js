import React, { Component } from 'react';

import NumberSystemControl from '../NumberSystemControl/NumberSystemControl';
import BitsPerComponentControl from '../BitsPerComponentControl/BitsPerComponentControl';
// import './NumberSettingsControls.css';

class NumberSettingsControls extends Component {
  render() {
    return (
      <div>
        <NumberSystemControl />
        <BitsPerComponentControl />
      </div>
    );
  }
}

export default NumberSettingsControls;
