import React, { Component } from 'react';
import _ from 'lodash';

import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorCode from '../../classes/ColorCode/ColorCode';
import ColorCoderGame from '../../classes/ColorCoderGame/ColorCoderGame';
import GameLevelsMenu from '../GameLevelsMenu/GameLevelsMenu';
import ColorCoderGuessInProgressDisplay from '../ColorCoderGuessInProgressDisplay/ColorCoderGuessInProgressDisplay';
import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';

import './ColorCoderMainSection.css';

class ColorCoderMainSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoColor: new ColorCode({
        base: 16,
        bits: 24,
        red: 255,
        green: 255,
        blue: 255
      }),
      levelScreenShowColorComponents: true,
      controlsDisabled: false,
      activeSymbolButtons: [],
      isDeleteButtonActive: false,
      currentGame: null,
      guessInProgress: null,
      gameScreenShowColorComponents: false
    }

    this.getSetUpGameFunction = this.getSetUpGameFunction.bind(this);
    this.getLevelInfoList = this.getLevelInfoList.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addSymbolToCode = this.addSymbolToCode.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.setControlsDisabled = this.setControlsDisabled.bind(this);
    this.activateSymbolButtonInPanel = this.activateSymbolButtonInPanel.bind(this);
    this.updateGuessInProgress = this.updateGuessInProgress.bind(this);
  }

  initializeGuessInProgress(level) {
    if (level === 1) {
      this.setState({
        guessInProgress: new ColorCode({ base: 2, bits: 6, code: ''})
      })
    } else if (level === 2) {
      this.setState({
        guessInProgress: new ColorCode({ base: 16, bits: 12, code: ''})
      })
    } else if (level === 3) {
      this.setState({
        guessInProgress: new ColorCode({ base: 16, bits: 24, code: ''})
      })
    }
  }

  getSetUpGameFunction(level) {
    return () => {
      this.initializeGuessInProgress(level);
      this.setState({
        currentGame: new ColorCoderGame({level})
      });
    }
  }

  getLevelInfoList() {
    return [
      {
        title: 'Beginner',
        bits: '6',
        system: 'Binary',
        colors: '64',
        callback: this.getSetUpGameFunction(1)
      },
      {
        title: 'Intermediate',
        bits: '12',
        system: 'Hex',
        colors: '4,096',
        callback: this.getSetUpGameFunction(2)
      },
      {
        title: 'Expert',
        bits: '24',
        system: 'Hex',
        colors: '16,777,216',
        callback: this.getSetUpGameFunction(3)
      }
    ]
  }

  // Given a symbol, add it to the code, or if the code is already full, start a new one
  // param symbol - the symbol to add to the code
  addSymbolToCode(symbol, fromTour) {
    const colorCode = this.state.guessInProgress;

    let newCode = '';
    if (colorCode.isPartial) {
      newCode = colorCode.getPartial() + symbol;
    } else {
      newCode = symbol;
    }

    // if fromTour is true, we need to pass that along to updateColor
    if (fromTour) {
      this.updateGuessInProgress({
        newCode,
        fromTour: true
      });
    } else {
      this.updateGuessInProgress({
        newCode,
        fromTour: false
      });
    }

    if (newCode.length === colorCode.getFullCodeLength()) {
      // Guess code is complete, so process it
      setTimeout(() => {
        this.state.currentGame.processGuess(newCode);
      }, 10);
    }
  }

  // Remove the last symbol from the code and update. If the code is empty, do nothing
  removeSymbolFromCode() {
    const colorCode = this.state.guessInProgress
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

    this.updateGuessInProgress({
      newCode: newCodeAsString,
    });
  }

  handleDeleteButtonClick() {
    this.removeSymbolFromCode();
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

    // If there is no current game, or the game is over then ignore key presses
    if (this.state.currentGame === null || this.state.currentGame.currentPuzzleIndex === 3) {
      return;
    }

    const colorCode = this.state.guessInProgress;

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

  // Takes a boolean value and updates controlsDisabled state
  setControlsDisabled(newValue) {
    this.setState({
      controlsDisabled: newValue
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Parameters:
  //   newCode: A string with a new color code to use
  //   tour: true if being called from tour, otherwise false
  updateGuessInProgress({newCode, fromTour}) {
    // Do not update the color if the controls are disabled and the request is not from the tour
    if (this.state.controlsDisabled && !fromTour) {
      return;
    }

    const oldCode = this.state.guessInProgress;

    this.setState({
      guessInProgress: new ColorCode({
        base: oldCode.getBase(),
        bits: oldCode.getBits(),
        code: newCode
      })
    });
  }

  getLevelScreen() {
    return (
      <div className='ColorCoderMainSection__container'>
        <h1 className='ColorCoderMainSection__title'>ColorCoder</h1>
        <ColorDisplay colorCode={this.state.logoColor} showColorComponents={this.state.levelScreenShowColorComponents} size={'small'}/>
        <GameLevelsMenu getLevelInfoList={this.getLevelInfoList} />
      </div>
    )
  }

  getEndScreen() {

  }

  getGamePlayScreen() {
    return (
      <div className='ColorCoderMainSection__container'>
        {/* <ColorCoderGuessPanel /> */}
        <ColorDisplay colorCode={this.state.currentGame.getCurrentColorToGuess()} showColorComponents={this.state.gameScreenShowColorComponents} userCanToggle={false}/>
        <ColorCoderGuessInProgressDisplay guessInProgress={this.state.guessInProgress} handleDeleteButtonClick={this.handleDeleteButtonClick} isDeleteButtonActive={this.state.isDeleteButtonActive} />
        <ColorCodeButtonPanel colorCode={this.state.guessInProgress} addSymbolToCode={this.addSymbolToCode} activeSymbolButtons={this.activeSymbolButtons} />
      </div>
    )
  }

  render() {
    let currentGame = this.state.currentGame;

    if (currentGame === null) {
      return this.getLevelScreen();
    } else if (currentGame.currentPuzzleIndex === 3) {
      return this.getEndScreen();
    } else {
      return this.getGamePlayScreen();
    }
  }
}

export default ColorCoderMainSection;
