import React, { Component } from 'react';

import ColorComponentSlider from '../ColorComponentSlider/ColorComponentSlider';
// import './ColorComponentsControls.css';

class ColorComponentsControls extends Component {
  render() {
    return (
      <div>
        <ColorComponentSlider />
        <ColorComponentSlider />
        <ColorComponentSlider />
      </div>
    );
  }
}

export default ColorComponentsControls;
