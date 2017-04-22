import React, { Component } from 'react';

// import './ColorComponentSlider.css';

class ColorComponentSlider extends Component {
  render() {
    return (
      <div>
        <label>Red</label>
        <input type='range'/>
      </div>
    );
  }
}

export default ColorComponentSlider;
