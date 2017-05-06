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
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
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

  // Remove the last symbol from the code and update. If the code is empty, do nothing
  removeSymbolFromCode() {
    const colorCode = this.props.colorCode;
    let previousCodeAsString;

    if (colorCode.isPartial) {
      // If the code is empty, do nothing
      if (colorCode.getPartial().length === 0) {
        return;
      }
      previousCodeAsString = colorCode.getPartial();
    }
    else {
      previousCodeAsString = colorCode.getCode();
    }

    const newCodeAsString = previousCodeAsString.slice(0, previousCodeAsString.length - 1);

    this.props.onColorChange({
      newCode: newCodeAsString,
      base: colorCode.getBase(),
      bits: colorCode.getBits()
    });
  }

  getCodeBoxAndDeleteButton() {
    if (this.state.inCodeEditMode) {
      return (
        <div className='ColorControls__code-delete-container'>
          {/*The next div is just there to balance the delete button for styling*/}
          <div className='ColorControls__delete-button-balance'></div>
          <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} />
          <button className='button ColorControls__delete-button' onClick={this.handleDeleteButtonClick}>⌫</button>
        </div>
      );
    } else {
      return (
        <div className='ColorControls__code-delete-container'>
          <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} />
        </div>
      );
    }
  }

  handleDeleteButtonClick() {
    this.removeSymbolFromCode();
  }

  handleDocumentClick(e) {
    const classesOfEditModeElements = [
      'ColorCodeComponentDisplay',
      'ColorCodeButtonPanel__button',
      'ColorControls__delete-button'
    ];

    const includesNone = (str, list) => {
      return _.every(list, (item) => {
        console.log('check if ' + str + ' includes ' + item);
        return !str.includes(item);
      });
    }
    if (includesNone(e.target.className, classesOfEditModeElements)) {
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

    if (document.activeElement.className === 'ColorCodeComponentDisplay__container') {
      if (symbol === ' ' || symbol === 'ENTER') {
        this.setCodeEditMode(true);
      }
    }

    const colorCode = this.props.colorCode;

    if (this.state.inCodeEditMode) {
      // Check for BACKSPACE before checking for valid symbols to add
      if (symbol === 'BACKSPACE') {
        this.removeSymbolFromCode();
        return;
      }

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

  render() {
    return (
      <div className='ColorControls__container'>
        {this.getCodeBoxAndDeleteButton()}
        {this.getControlPanel()}
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
