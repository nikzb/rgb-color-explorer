import React, { Component } from 'react';

import ColorComponentSlider from '../ColorComponentSlider/ColorComponentSlider';
// import './ColorComponentsControls.css';

class ColorComponentsControls extends Component {
  render() {
    return (
      <div>
        <ColorComponentSlider colorComp='Red'/>
        <ColorComponentSlider colorComp='Green'/>
        <ColorComponentSlider colorComp='Blue'/>
      </div>
    );
  }
}

export default ColorComponentsControls;
