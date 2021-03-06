import React, { Component } from 'react';
import _ from 'lodash';

import ColorCode from '../../classes/ColorCode/ColorCode';
import RGBTour from '../../classes/Tours/RGBTour';

import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorControls from '../ColorControls/ColorControls';
import Header from '../Header/Header';

import './RGBMainSection.css';

class MainSection extends Component {
  constructor(props) {
    super(props);

    this.updateColor = this.updateColor.bind(this);
    this.toggleShowColorComponents = this.toggleShowColorComponents.bind(this);
    this.isShowingColorComponents = this.isShowingColorComponents.bind(this);
    this.setCodeEditMode = this.setCodeEditMode.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addSymbolToCode = this.addSymbolToCode.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.setControlsDisabled = this.setControlsDisabled.bind(this);
    this.activateSymbolButtonInPanel = this.activateSymbolButtonInPanel.bind(this);
    this.updateToFullCode = this.updateToFullCode.bind(this);

    this.state = {
      // colorCode: new ColorCode({
      //   base: 2,
      //   bits: 9,
      //   red: 7,
      //   green: 1,
      //   blue: 0
      // })
      colorCode: new ColorCode({
        base: 16,
        bits: 12,
        red: 15,
        green: 11,
        blue: 15
      }),
      showColorComponents: true,
      tour: (new RGBTour({
        toggleShowColorComponents: this.toggleShowColorComponents,
        isShowingColorComponents: this.isShowingColorComponents,
        updateColor: this.updateColor,
        setControlsDisabled: this.setControlsDisabled,
        setCodeEditMode: this.setCodeEditMode,
        addSymbolToCode: this.addSymbolToCode,
        activateSymbolButtonInPanel: this.activateSymbolButtonInPanel,
        updateToFullCode: this.updateToFullCode
      })).getTour(),

      // code edit mode is when the button panel is enabled for typing in codes
      inCodeEditMode: false,
      isDeleteButtonActive: false,
      activeSymbolButtons: [],
      controlsDisabled: false
    };
  }

  setCodeEditMode(newValue) {
    this.setState({
      inCodeEditMode: newValue
    });
  }

  // Given a symbol, add it to the code, or if the code is already full, start a new one
  // param symbol - the symbol to add to the code
  addSymbolToCode(symbol, fromTour) {
    const colorCode = this.state.colorCode;

    let newCode = '';
    if (colorCode.isPartial) {
      newCode = this.state.colorCode.getPartial() + symbol;
    } else {
      newCode = symbol;
    }

    // if fromTour is true, we need to pass that along to updateColor
    if (fromTour) {
      this.updateColor({
        newCode,
        base: colorCode.getBase(),
        bits: colorCode.getBits(),
        fromTour: true
      });
    } else {
      this.updateColor({
        newCode,
        base: colorCode.getBase(),
        bits: colorCode.getBits(),
        fromTour: false
      });
    }

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
    const colorCode = this.state.colorCode;
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

    this.updateColor({
      newCode: newCodeAsString,
      base: colorCode.getBase(),
      bits: colorCode.getBits()
    });
  }

  updateToFullCode(fromTour) {
    this.updateColor({
      newCode: this.state.colorCode.getCode(),
      fromTour
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

    const includesNone = (str, list) => {
      return _.every(list, (item) => {
        return !_.includes(str, item);
      });
    }
    if (includesNone(e.target.className, classesOfEditModeElements)) {
      if (this.state.inCodeEditMode) {
        this.setCodeEditMode(false);
        if (this.state.colorCode.isPartial) {
          // Replace with a full code
          this.updateToFullCode();
        }
      }
    } else if (!this.state.inCodeEditMode) {
      if (!this.state.controlsDisabled) {
        this.setCodeEditMode(true);
      }
    }
  }

  activateSymbolButtonInPanel(symbol) {
    if (!_.includes(this.state.activeSymbolButtons, symbol)) {
      //This can be done with immutability helpers too, but just kept it simple for now: https://facebook.github.io/react/docs/update.html
      let newActiveSymbolButtons = _.concat(this.state.activeButtons, symbol);
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
  }

  handleKeyDown(e) {
    const symbol = e.key.toUpperCase();

    if (document.activeElement.className === 'ColorCodeComponentDisplay__container') {
      if (symbol === ' ' || symbol === 'ENTER') {
        this.setCodeEditMode(true);
      }
    }

    const colorCode = this.state.colorCode;

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
      this.activateSymbolButtonInPanel(symbol);

      this.addSymbolToCode(symbol);
    }
  }

  componentDidMount() {
    document.body.classList.add('dark');
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeyDown);
    this.state.tour.start();
  }

  componentWillUnmount() {
    document.body.classList.remove('dark');
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    this.state.tour.hide();
  }

  // Takes a boolean value and updates controlsDisabled state
  setControlsDisabled(newValue) {
    this.setState({
      controlsDisabled: newValue
    });
  }

  // Parameters:
  //   newCode: A string with a new color code to use
  //   comp: The color component getting updated
  //   newValue: The new value of the color component being updated
  //   newBase: The base for the new color code, if different from the old base
  //   newBitsPerComponent: The new number of bits per component, if different then the old
  updateColor({newCode, comp, newValue, newBase, newBitsPerComponent, fromTour}) {
    // Do not update the color if the controls are disabled and the request is not from the tour
    if (this.state.controlsDisabled && !fromTour) {
      return;
    }

    const oldCode = this.state.colorCode;

    const convertToNewNumberOfBits = ({base, newBitsPerComp}) => {
      const newMax = Math.pow(2, newBitsPerComp) - 1;
      const oldMax = oldCode.getMaxComponentValue();
      const factor = newMax / oldMax;
      this.setState({
        colorCode: new ColorCode({
          base,
          bits: newBitsPerComp * 3,
          red: Math.round(oldCode.getComponent('R') * factor),
          green: Math.round(oldCode.getComponent('G') * factor),
          blue: Math.round(oldCode.getComponent('B') * factor)
        })
      });
    };

    // If a code is included in the parameter object, use the code to update the color
    if (newCode || newCode === '') {
      // let baseUsedInCode;
      // if (newCode.charAt(0) === '#') {
      //   baseUsedInCode = 16;
      // } else {
      //   baseUsedInCode = 2;
      // }
      this.setState({
        colorCode: new ColorCode({
          base: oldCode.getBase(),
          bits: oldCode.getBits(),
          code: newCode
        })
      });
    }
    else if (comp) { // if no code is included, check if a component is specified to be updated
      if (comp === 'R') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: newValue,
            green: oldCode.getComponent('G'),
            blue: oldCode.getComponent('B')
          })
        });
      } else if (comp === 'G') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: oldCode.getComponent('R'),
            green: newValue,
            blue: oldCode.getComponent('B')
          })
        });
      } else if (comp === 'B') {
        this.setState({
          colorCode: new ColorCode({
            base: oldCode.getBase(),
            bits: oldCode.getBits(),
            red: oldCode.getComponent('R'),
            green: oldCode.getComponent('G'),
            blue: newValue
          })
        });
      }
    } else if (newBase) {
      // Make sure the base actually changed
      if (newBase === oldCode.getBase())
        return;
      // Convert to new base. This assumes that it will only be run if the base is actually changing
      if (newBase === 16) {
        convertToNewNumberOfBits({
          base: newBase,
          newBitsPerComp: 4
        });
      } else {
        convertToNewNumberOfBits({
          base: newBase,
          newBitsPerComp: 2
        });
      }
    } else if (newBitsPerComponent) {
      // convert to new number of bits (keeping same base)
      convertToNewNumberOfBits({
        base: oldCode.getBase(),
        newBitsPerComp: newBitsPerComponent
      });
    }
  }

  toggleShowColorComponents() {
    this.setState({
      showColorComponents: !this.state.showColorComponents
    });
  }

  isShowingColorComponents() {
    return this.state.showColorComponents;
  }

  render() {
    return (
      <div className='MainSection__container'>
        <Header title={'RGB Color Explorer'} />
        <ColorDisplay colorCode={this.state.colorCode} showColorComponents={this.state.showColorComponents} toggleShowColorComponents={this.toggleShowColorComponents} userCanToggle={true} size={'smaller'}/>
        <ColorControls colorCode={this.state.colorCode} onColorChange={this.updateColor} showColorComponents={this.state.showColorComponents} toggleShowColorComponents={this.toggleShowColorComponents} inCodeEditMode={this.state.inCodeEditMode} handleDeleteButtonClick={this.handleDeleteButtonClick} isDeleteButtonActive={this.state.isDeleteButtonActive} addSymbolToCode={this.addSymbolToCode} activeSymbolButtons={this.state.activeSymbolButtons} controlsDisabled={this.state.controlsDisabled}/>
      </div>
    );
  }
}

export default MainSection;
