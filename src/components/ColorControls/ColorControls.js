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
      cursorPosition: 0,
      inCodeEditMode: false
    }
    this.handleOnFocusOnTextInput = this.handleOnFocusOnTextInput.bind(this);
    this.setCursorPosition = this.setCursorPosition.bind(this);
    this.setCodeEditMode = this.setCodeEditMode.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  setCursorPosition(cursorPosition) {
    this.setState({
      cursorPosition
    });
  }

  setCodeEditMode(newValue) {
    this.setState({
      inCodeEditMode: newValue
    });
  }

  handleOnFocusOnTextInput() {
    console.log('in hanldeOnFocusOnTextInput');
    const colorCode = this.props.colorCode;
    this.setCodeEditMode(true);

    // Select the code so that the user can type or use button panel to replace it
    // For hex, start at index 1 so that you leave the # symbol in place
    let startIndex;
    let endIndex;
    if (colorCode.getBase() === 2) {
      startIndex = 0;
      endIndex = colorCode.getCode().length;
    } else if (colorCode.getBase() === 16) {
      startIndex = 1;
      endIndex = colorCode.getCode().length + 1;
    }
    this.codeInputElement.setSelectionRange(startIndex, endIndex);
  }

  // putFocusOnTextInput(startIndex) {
  //   console.log('putting focus back on text input at index ' + startIndex);
  //   this.codeInputElement.focus();
  //   this.codeInputElement.setSelectionRange(startIndex, startIndex);
  // }

  getControlPanel() {
    if (this.state.inCodeEditMode) {
      return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} setCursorPosition={this.setCursorPosition} setCodeEditMode={this.setCodeEditMode} codeInputElement={this.codeInputElement}/>;
    } else {
      return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    }
  }

  handleDocumentClick(e) {
    console.log('in handle document click');
    if (e.target.className.includes('ColorCodeControl__input') || e.target.className.includes('ColorCodeButtonPanel__button')) {
      if (!this.state.inCodeEditMode) {
        console.log('setting to code edit mode');
        this.setCodeEditMode(true);
      }
    }
    else {
      if (this.state.inCodeEditMode) {
        this.setCodeEditMode(false);
      }
    }
  }

  componentDidMount() {
	  document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="ColorControls__container">
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} codeInputRef={el => this.codeInputElement = el} onFocus={this.handleOnFocusOnTextInput} inCodeEditMode={this.state.inCodeEditMode} codeInputElement={this.codeInputElement} cursorPosition={this.state.cursorPosition}/>
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
