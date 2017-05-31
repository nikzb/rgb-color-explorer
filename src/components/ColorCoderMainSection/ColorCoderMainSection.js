import React, { Component } from 'react';
import _ from 'lodash';

import ColorDisplay from '../ColorDisplay/ColorDisplay';
import ColorCode from '../../classes/ColorCode/ColorCode';
import ColorCoderGame from '../../classes/ColorCoderGame/ColorCoderGame';
import GameLevelsMenu from '../GameLevelsMenu/GameLevelsMenu';
import ColorCoderGuessInProgressDisplay from '../ColorCoderGuessInProgressDisplay/ColorCoderGuessInProgressDisplay';
import ColorCodeButtonPanel from '../ColorCodeButtonPanel/ColorCodeButtonPanel';
import ColorCoderGuessPanel from '../ColorCoderGuessPanel/ColorCoderGuessPanel';
import Header from '../Header/Header';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';
import ColorCoderTour from '../../classes/Tours/ColorCoderTour';

import './ColorCoderMainSection.css';

class ColorCoderMainSection extends Component {
  constructor(props) {
    super(props);

    this.getSetUpGameFunction = this.getSetUpGameFunction.bind(this);
    this.getLevelInfoList = this.getLevelInfoList.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addSymbolToCode = this.addSymbolToCode.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.setControlsDisabled = this.setControlsDisabled.bind(this);
    this.activateSymbolButtonInPanel = this.activateSymbolButtonInPanel.bind(this);
    this.updateGuessInProgress = this.updateGuessInProgress.bind(this);
    this.goToLevelScreen = this.goToLevelScreen.bind(this);
    this.performAnimationWhenPuzzleSolved = this.performAnimationWhenPuzzleSolved.bind(this);
    this.toggleGameScreenShowColorComponents = this.toggleGameScreenShowColorComponents.bind(this);
    this.preventZoom = this.preventZoom.bind(this);
    this.resetPreventZoom = this.resetPreventZoom.bind(this);

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
      gameScreenShowColorComponents: false,
      readyToShowScore: false,
      lastTouch: 0,
      tour: (new ColorCoderTour({
        addSymbolToCode: this.addSymbolToCode,
        activateSymbolButtonInPanel: this.activateSymbolButtonInPanel,
        setGameToNull: () => {
          this.setState({
            currentGame: null
          });
        }
      })).getTour(),
    }
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

  getSetUpGameFunction(level, isDemo) {
    return () => {
      this.initializeGuessInProgress(level);

      this.setState({
        currentGame: new ColorCoderGame({
          level,
          isDemo,
          performAnimationWhenPuzzleSolved: this.performAnimationWhenPuzzleSolved,
          forceUpdate: this.forceUpdate.bind(this)
        })
      });

      if (isDemo) {
        this.setState({
          controlsDisabled: true
        });
        this.state.tour.start();
      }
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
      this.state.currentGame.processGuess(
        new ColorCode({
          code: newCode,
          bits: colorCode.getBits(),
          base: colorCode.getBase()
        })
      );
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

  // code from: https://stackoverflow.com/questions/42450642/prevent-double-tap-zoom-without-jquery
  preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = this.state.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    this.setState({
      lastTouch: t2
    })

    if (!dt || dt >= 300 || fingers > 1) {
        return;
    }
    this.resetPreventZoom();
    e.preventDefault();
    e.target.click();
  }

  resetPreventZoom() {
    this.setState({
      lastTouch: 0
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('touchstart', this.preventZoom, false);
    document.addEventListener('touchmove', this.resetPreventZoom, false);

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('touchstart', this.preventZoom, false);
    document.removeEventListener('touchmove', this.resetPreventZoom, false);
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

  toggleGameScreenShowColorComponents() {
    this.setState({
      gameScreenShowColorComponents: !this.state.gameScreenShowColorComponents
    });
  }

  goToLevelScreen() {
    this.setState({currentGame:null});
  }

  getAnimationSequence(resolve) {
    this.toggleGameScreenShowColorComponents();
    setTimeout(() => {
      this.toggleGameScreenShowColorComponents();
      setTimeout(() => {
        //Set the state so that the guess panel will show the points earned
        this.setState({
          readyToShowScore: true
        });
        //this.currentGame.getCurrentPuzzle().
        setTimeout(() => {
          resolve();
          this.setState({
            readyToShowScore: false
          });
        }, 3000);
      }, 1);
    }, 2500)
  }

  performAnimationWhenPuzzleSolved() {
    return new Promise((resolve, reject) => {
      this.getAnimationSequence(resolve);
      //setTimeout(this.getAnimationSequence.bind(this, resolve), 1000);
    })
  }

  // Note about ColorDisplay: I used the key prop to force each screen to get a unique ColorDisplay
  // This resolved an issue with the transition animation showing when it shouldn't.

  getLevelScreen() {
    return (
      <div className='ColorCoderMainSection__container'>
        <Header />
        <div className='ColorCoderMainSection__title'>
          <SouvlakiTitle size={'med-large'} title={'ColorCoder'} />
        </div>
        <ColorDisplay key={'levelScreen'} colorCode={this.state.logoColor} showColorComponents={this.state.levelScreenShowColorComponents} size={'even-smaller'}/>
        <div className='ColorCoder__demo-container'>First time? Try this <span className='ColorCoder__demo-link' onClick={this.getSetUpGameFunction(1, true)}>Demo</span></div>
        {/* <button className='button ColorCoder__demo-button' onClick={this.getSetUpGameFunction(1, true)}>Demo</button> */}
        <GameLevelsMenu getLevelInfoList={this.getLevelInfoList} />
      </div>
    )
  }

  getEndScreen() {
    // const bestScore = this.state.currentGame.getLowestNumberOfGuesses();
    // let message;
    // if (bestScore === 1) {
    //   message = 'Your best score was 1 guess.';
    // } else {
    //   message = `Your best score was ${bestScore} guesses.`;
    // }

    const score = this.state.currentGame.getScore();
    // const maxScore = this.state.currentGame.getMaxPossibleScore();

    return (
      <div className='ColorCoderMainSection__container'>
        <Header />
        <div className='ColorCoderMainSection__title'>
          <SouvlakiTitle size={'med-large'} title={'ColorCoder'} />
        </div>
        <ColorDisplay key={'endScreen'} colorCode={this.state.logoColor} showColorComponents={this.state.levelScreenShowColorComponents} size={'even-smaller'}/>

        <div className='ColorCoder__score-message'>
          <div className='ColorCoder__score-label'>Final Score</div>
          <div className='ColorCoder__score'>{score}</div>
          {/* <div className='ColorCoder__score-out-of'>out of {maxScore}</div> */}
        </div>

        <div className='ColorCoder__action-buttons'>
          <button className='button' onClick={this.getSetUpGameFunction(this.state.currentGame.getLevel())}>Play Again</button>
          <button className='button' onClick={this.goToLevelScreen}>Level Options</button>
        </div>
      </div>
    )
  }

  getGamePlayScreen() {
    return (
      <div className='ColorCoderMainSection__container'>
        <Header title={'ColorCoder'} />
        <ColorCoderGuessPanel currentPuzzle={this.state.currentGame.getCurrentPuzzle()} puzzleNumber={this.state.currentGame.currentPuzzleIndex + 1} readyToShowScore={this.state.readyToShowScore}/>
        <ColorDisplay classes={'ColorDisplay--level'} key={'gamePlay'} colorCode={this.state.currentGame.getCurrentColorToGuess()} showColorComponents={this.state.gameScreenShowColorComponents} userCanToggle={false} size={'even-smaller'}/>
        <ColorCoderGuessInProgressDisplay guessInProgress={this.state.guessInProgress} handleDeleteButtonClick={this.handleDeleteButtonClick} isDeleteButtonActive={this.state.isDeleteButtonActive} />
        <div className='ColorControlPanel__container'>
            <ColorCodeButtonPanel colorCode={this.state.guessInProgress} addSymbolToCode={this.addSymbolToCode} activeSymbolButtons={this.state.activeSymbolButtons} />
        </div>
      </div>
    )
  }

  render() {
    let currentGame = this.state.currentGame;

    if (currentGame === null) {
      return this.getLevelScreen();
    } else if (currentGame.isGameOver()) {
      return this.getEndScreen();
    } else {
      return this.getGamePlayScreen();
    }
  }
}

export default ColorCoderMainSection;
