import React, { Component } from 'react';
import _ from 'lodash';

import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import ColorComponentsControls from '../ColorComponentsControls/ColorComponentsControls';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';
import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';

import './ColorControls.css';

class ColorControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCodeEditMode: false,
      shouldReset: false
    }
    this.setCodeEditMode = this.setCodeEditMode.bind(this);
    this.setShouldReset = this.setShouldReset.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addSymbolToCode = this.addSymbolToCode.bind(this);
  }

  setCodeEditMode(newValue) {
    this.setState({
      inCodeEditMode: newValue
    });
  }

  setShouldReset(newValue) {
    this.setState({
      shouldReset: newValue
    });
  }

  getControlPanel() {
    if (this.state.inCodeEditMode) {
      return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} addSymbolToCode={this.addSymbolToCode}/>;
    } else {
      return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
    }
  }

  // Given a symbol, add it to the code, or if the code is already full, start a new one
  // param symbol - the symbol to add to the code
  // param fromButton - true if the symbol came from pressing a button in the button panel
  //                  - needed to correctly handle reset because button click event causes issue where inCodeEditMode is set prematurely
  addSymbolToCode(symbol, fromButton) {
    const colorCode = this.props.colorCode;

    let newCode = '';
    if (colorCode.isPartial) {
      newCode = this.props.colorCode.getPartial() + symbol;
    } else {
      newCode = symbol;
    }

    this.props.onColorChange({
      newCode,
      base: colorCode.getBase(),
      bits: colorCode.getBits()
    });

    if (newCode.length === colorCode.getFullCodeLength()) {
      this.setCodeEditMode(false);
      if (fromButton) {
        this.setShouldReset(true);
      }
    }
  }

  handleDocumentClick(e) {
    if (!e.target.className.includes('ColorCodeComponentDisplay') && !e.target.className.includes('ColorCodeButtonPanel__button')) {
      if (this.state.inCodeEditMode) {
        this.setCodeEditMode(false);
        if (this.props.colorCode.isPartial) {
          // Replace with a full code
          this.props.onColorChange({
            newCode: this.props.colorCode.getCode(),
          });
        }
      }
    } else if (this.state.shouldReset) {
      this.setCodeEditMode(false);
      this.setShouldReset(false);
    } else if (!this.state.inCodeEditMode) {
      this.setCodeEditMode(true);
    }
  }

  handleKeyDown(e) {
    const symbol = e.key.toUpperCase();
    const colorCode = this.props.colorCode;
    console.log(e);
    console.log(symbol);

    if (this.state.inCodeEditMode) {
      // Validate based on base currently being used
      if (colorCode.getBase() === 2) {
        const validBinarySymbols = ['0', '1'];
        if (!_.includes(validBinarySymbols, symbol)) {
          return;
        }
      }
      else if (colorCode.getBase() === 16) {
        const validHexSymbols = ['0', '1', '2', '3', '4', '5', '6', '7',
                                 '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        if (!_.includes(validHexSymbols, symbol)) {
          return;
        }
      }

      // If we made it to this point, the symbol is valid for the current base
      this.addSymbolToCode(symbol);
    }
  }

  componentDidMount() {
	  document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div className="ColorControls__container">
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} />
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
