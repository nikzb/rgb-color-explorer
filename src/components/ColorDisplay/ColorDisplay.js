import React, { Component } from 'react';

import './ColorDisplay.css';
import ColorViz from '../ColorViz/ColorViz';
import ColorComponentViewToggle from '../ColorComponentViewToggle/ColorComponentViewToggle';

class ColorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorComponents: true
    }
  }
  render() {
    return (
      <div className='ColorDisplay__container'>
        <ColorViz colorCode={this.props.colorCode}/>
        <ColorComponentViewToggle />
      </div>
    );
  }
}

export default ColorDisplay;
