import React, { Component } from 'react';
import _ from 'lodash';

import ColorControlPanel from '../ColorControlPanel/ColorControlPanel';
import ColorCodeControl from '../ColorCodeControl/ColorCodeControl';
import NumberSettingsControls from '../NumberSettingsControls/NumberSettingsControls';

import './ColorControls.css';

class ColorControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inCodeEditMode: false,
      isDeleteButtonActive: false,
      activeSymbolButtons: []
    }
    this.setCodeEditMode = this.setCodeEditMode.bind(this);
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

  // getControlPanel() {
  //   if (this.state.inCodeEditMode) {
  //     return <ColorCodeButtonPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} addSymbolToCode={this.addSymbolToCode} activeSymbolButtons={this.state.activeSymbolButtons} />;
  //   } else {
  //     return <ColorComponentsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} />;
  //   }
  // }

  // Given a symbol, add it to the code, or if the code is already full, start a new one
  // param symbol - the symbol to add to the code
  addSymbolToCode(symbol) {
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
      // using a setTimeout here eliminated the need for the "shouldReset" state value
      // I initially put this in here so you could see the symbol button activate when you type on the keyboard
      // I decided that it looked better if the button panel disappeared right away when you enter the last symbol
      setTimeout(() => {
        this.setCodeEditMode(false);
      }, 10);
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

  handleDeleteButtonClick() {
    this.removeSymbolFromCode();
  }

  handleDocumentClick(e) {
    const classesOfEditModeElements = [
      'ColorCodeComponentDisplay',
      'ColorCodeButtonPanel__button',
      'ColorCodeControl__delete-button'
    ];

    console.log(`${e.target.className} was clicked`);

    const includesNone = (str, list) => {
      return _.every(list, (item) => {
        return !_.includes(str, item);
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
    } else if (!this.state.inCodeEditMode) {
      console.log('Entering edit mode');
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
        // Make the button change color like when clicked
        this.setState({
          isDeleteButtonActive: true
        });
        setTimeout(() => {
          this.setState({
            isDeleteButtonActive: false
          });
        }, 100);

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
      // Make the button change color like when clicked


      if (!_.includes(this.state.activeSymbolButtons, symbol)) {
          //This can be done with immutability helpers too, but just kept it simple for now: https://facebook.github.io/react/docs/update.html
        let newActiveSymbolButtons = _.concat(this.state.activeButtons, symbol);
        console.log('new button array: ' + newActiveSymbolButtons);
        this.setState({
          activeSymbolButtons: newActiveSymbolButtons
        });
      }
      setTimeout(() => {
        let newActiveSymbolButtons = _.without(this.state.activeSymbolButtons, symbol);
        this.setState({
          activeSymbolButtons: newActiveSymbolButtons
        });
      }, 100);

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
        <ColorCodeControl colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} onDeleteButton={this.handleDeleteButtonClick} isDeleteButtonActive={this.state.isDeleteButtonActive} showColorComponents={this.props.showColorComponents} toggleShowColorComponents={this.props.toggleShowColorComponents}/>
        <ColorControlPanel colorCode={this.props.colorCode} onColorChange={this.props.onColorChange} inCodeEditMode={this.state.inCodeEditMode} addSymbolToCode={this.addSymbolToCode} activeSymbolButtons={this.state.activeSymbolButtons} />
        <NumberSettingsControls colorCode={this.props.colorCode} onColorChange={this.props.onColorChange}/>
      </div>
    );
  }
}

export default ColorControls;
