import React, { Component } from 'react';

import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import ColorComponentsControls from '../ColorComponentsControls/ColorComponentsControls';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';
// import './ColorControls.css';

class ColorControls extends Component {
  render() {
    return (
      <div>
        <ColorCodeControl />
        <ColorComponentsControls />
        <NumberSettingsControls />
      </div>
    );
  }
}

export default ColorControls;
