import React, { Component } from 'react';

import './ColorDisplay.css';
import ColorViz from '../ColorViz/ColorViz';
import ColorComponentViewToggle from '../ColorComponentViewToggle/ColorComponentViewToggle';

class ColorDisplay extends Component {
  render() {
    return (
      <div className='ColorDisplay__container'>
        <ColorViz />
        <ColorComponentViewToggle />
      </div>
    );
  }
}

export default ColorDisplay;
