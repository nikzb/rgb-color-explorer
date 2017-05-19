import React, { Component } from 'react';

import ColorComponentSlider from '../ColorComponentSlider/ColorComponentSlider';
import './ColorComponentsControls.css';

class ColorComponentsControls extends Component {
  render() {
    const colorCode = this.props.colorCode;
    //This doesn't work for 9 bit binary!!!
    // const sliderStep = 255 / (Math.pow(2, colorCode.getBitsPerComponent()) - 1);
    const maxIntensity = (Math.pow(2, colorCode.getBitsPerComponent()) - 1);
    const redIntensity = colorCode.getComponent('R');
    const greenIntensity = colorCode.getComponent('G');
    const blueIntensity = colorCode.getComponent('B');
    return (
      <div className='ColorComponentsControls__container'>
        <ColorComponentSlider colorComp='Red' intensity={redIntensity} max={maxIntensity} onColorChange={this.props.onColorChange} controlsDisabled={this.props.controlsDisabled}/>
        <ColorComponentSlider colorComp='Green' intensity={greenIntensity} max={maxIntensity} onColorChange={this.props.onColorChange} controlsDisabled={this.props.controlsDisabled}/>
        <ColorComponentSlider colorComp='Blue' intensity={blueIntensity} max={maxIntensity} onColorChange={this.props.onColorChange} controlsDisabled={this.props.controlsDisabled}/>
      </div>
    );
  }
}

export default ColorComponentsControls;
