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
      sliceOfInputToReplace: {
        startIndex: 0,
        endIndex: 0
      },
      mode: 'slider'
    }
    // this.setModeFunctions = this.setModeFunctions.bind(this);
    this.setToCodeEditMode = this.setToCodeEditMode.bind(this);
    this.setToSliderMode = this.setToSliderMode.bind(this);
    this.setSliceOfInputToReplace = this.setSliceOfInputToReplace.bind(this);
  }

  setSliceOfInputToReplace(startIndex, endIndex) {
    this.setState({
      sliceOfInputToReplace: {
        startIndex,
        endIndex
      }
    });
  }

  // In code edit mode, buttons are shown with the number system symbols
  setToCodeEditMode() {
    this.setState({
      mode: 'codeEdit'
    });
  }

  // In slider mode, a slider is shown for each of the three color components
  setToSliderMode() {
    this.setState({
      mode: 'slider'
    });
  }

  setModeFunctions() {
    return {
      setToCodeEditMode: this.setToCodeEditMode,
      setToSliderMode: this.setToSliderMode
    }
  }

  getControlPanel() {
    const activeElement = document.activeElement;

    console.log(activeElement);

    if (activeElement.className.includes('ColorCodeControl__input') ||
        activeElement.className.includes('ColorCodeButtonPanel__button')) {
      return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} sliceOfInputToReplace={this.state.sliceOfInputToReplace}/>;
    } else {
      return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    }

    // if (this.state.mode === 'slider') {
    //   return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    // } else if (this.state.mode === 'codeEdit') {
    //   return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>;
    // }
  }

  render() {
    return (
      <div className="ColorControls__container">
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} setSliceValues={this.setSliceOfInputToReplace} onFocusChange={this.setModeFunctions()}/>
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
