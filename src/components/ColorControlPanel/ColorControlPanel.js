import React, { Component } from 'react';

import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';
import ColorComponentsControls from '../ColorComponentsControls/ColorComponentsControls';

import './ColorControlPanel.css';

class ColorControlPanel extends Component {
  render() {
    if (this.props.inCodeEditMode) {
      return (
        <div className='ColorControlPanel__container'>
          <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} addSymbolToCode={this.props.addSymbolToCode} activeSymbolButtons={this.props.activeSymbolButtons} />
        </div>
      );
    } else {
      return (
        <div className='ColorControlPanel__container'>
          <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} controlsDisabled={this.props.controlsDisabled}/>
        </div>
      );
    }
  }
}

export default ColorControlPanel;
