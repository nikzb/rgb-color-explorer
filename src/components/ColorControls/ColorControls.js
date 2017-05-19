import React, { Component } from 'react';

import ColorControlPanel from '../ColorControlPanel/ColorControlPanel';
import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';

import './ColorControls.css';

class ColorControls extends Component {

  render() {
    return (
      <div className='ColorControls__container'>
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.props.inCodeEditMode} handleDeleteButtonClick={this.props.handleDeleteButtonClick} isDeleteButtonActive={this.props.isDeleteButtonActive} showColorComponents={this.props.showColorComponents} toggleShowColorComponents={this.props.toggleShowColorComponents}/>
        <ColorControlPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.props.inCodeEditMode} addSymbolToCode={this.props.addSymbolToCode} activeSymbolButtons={this.props.activeSymbolButtons} controlsDisabled={this.props.controlsDisabled}/>
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
