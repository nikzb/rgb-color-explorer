import React, { Component } from 'react';

import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import ColorComponentsControls from '../ColorComponentsControls/ColorComponentsControls';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';
import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';

import './ColorControls.css';

class ColorControls extends Component {
  constructor(props) {
    super(props);
    // Two possible states: codeEdit and slider
    this.state = {
      mode: 'codeEdit'
    }
  }

  // In code edit mode, buttons are shown with the number system symbols
  setToCodeEditMode() {
    this.setState({
      mode: 'codeEdit'
    })
  }

  // In slider mode, a slider is shown for each of the three color components
  setToSliderMode() {
    this.setState({
      mode: 'slider'
    });
  }

  getControlPanel() {
    if (this.state.mode === 'slider') {
      return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    } else if (this.state.mode === 'codeEdit') {
      return <ColorCodeButtonPanel base={this.props.colorCode.getBase()} onColorChange={this.props.onColorChange}/>;
    }
  }

  render() {
    return (
      <div className="ColorControls__container">
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
