import React, { Component } from 'react';

import ColorComponentSlider from '../ColorComponentSlider/ColorComponentSlider';
import './ColorComponentsControls.css';

class ColorComponentsControls extends Component {
  render() {
    const colorCode = this.props.colorCode;
    //This doesn't work for 9 bit binary!!!
    const sliderStep = 255 / (Math.pow(2, colorCode.getBitsPerComponent()) - 1);
    const redIntensity = colorCode.getComponent256('R');
    const greenIntensity = colorCode.getComponent256('G');
    const blueIntensity = colorCode.getComponent256('B');
    return (
      <div className='ColorComponentsControls__container'>
        <ColorComponentSlider colorComp='Red' intensity={redIntensity} sliderStep={sliderStep} onColorChange={this.props.onColorChange}/>
        <ColorComponentSlider colorComp='Green' intensity={greenIntensity} sliderStep={sliderStep} onColorChange={this.props.onColorChange}/>
        <ColorComponentSlider colorComp='Blue' intensity={blueIntensity} sliderStep={sliderStep} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorComponentsControls;
