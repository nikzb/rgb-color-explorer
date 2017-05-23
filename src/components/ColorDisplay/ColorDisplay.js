import React, { Component } from 'react';

import './ColorDisplay.css';
import ColorViz from '../ColorViz/ColorViz';

class ColorDisplay extends Component {
  render() {
    return (
      <div className='ColorDisplay__container'>
        <ColorViz colorCode={this.props.colorCode} showColorComponents={this.props.showColorComponents} onClick={this.props.toggleShowColorComponents} size={this.props.size}/>
      </div>
    );
  }
}

export default ColorDisplay;
