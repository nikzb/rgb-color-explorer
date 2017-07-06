import React, { Component } from 'react';
import { Map, List } from 'immutable';

import BitPanelGroup from '../BitPanelGroup/BitPanelGroup';
import BitPanelGroupWithPowerLabels from '../BitPanelGroupWithPowerLabels/BitPanelGroupWithPowerLabels';
import PrecisionGameViz from '../PrecisionGameViz/PrecisionGameViz';

import { newGame, currentPuzzle, getGameScore, goToNextRound, makeGuess, getCurrentValueToGuess, getRoundStatus } from '../../classes/PrecisionGame/PrecisionGame';


import './PrecisionGameMain.css';

class PrecisionGameMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: newGame('beginner'), // null, will get set based on level selection
      bitList: this.initialBitList('beginner'), // null, will get set based on level selection
      numberValue: 0,
      inReset: false,
      calculatePower: true
    };
    this.resetAllPanels = this.resetAllPanels.bind(this);
  }

  initialBitList(level) {
    if (level === 'beginner') {
      return List([
        Map({exponent: -1, angle: 0, isRotating: false, onClick: this.getClickHandler(0)}),
        Map({exponent: -2, angle: 0, isRotating: false, onClick: this.getClickHandler(1)}),
        Map({exponent: -3, angle: 0, isRotating: false, onClick: this.getClickHandler(2)}),
        Map({exponent: -4, angle: 0, isRotating: false, onClick: this.getClickHandler(3)}),
        Map({exponent: -5, angle: 0, isRotating: false, onClick: this.getClickHandler(4)}),
        Map({exponent: -6, angle: 0, isRotating: false, onClick: this.getClickHandler(5)})
      ])
    } else if (level === 'expert') {
      List([
        Map({exponent: -1, angle: 0, isRotating: false, onClick: this.getClickHandler(0)}),
        Map({exponent: -2, angle: 0, isRotating: false, onClick: this.getClickHandler(1)}),
        Map({exponent: -3, angle: 0, isRotating: false, onClick: this.getClickHandler(2)}),
        Map({exponent: -4, angle: 0, isRotating: false, onClick: this.getClickHandler(3)}),
        Map({exponent: -5, angle: 0, isRotating: false, onClick: this.getClickHandler(4)}),
        Map({exponent: -6, angle: 0, isRotating: false, onClick: this.getClickHandler(5)}),
        Map({exponent: -7, angle: 0, isRotating: false, onClick: this.getClickHandler(6)}),
        Map({exponent: -8, angle: 0, isRotating: false, onClick: this.getClickHandler(7)})
      ])
    } else {
      throw new Error('Invalid level specified when getting initial bit list');
    }
  }

  isResetting() {
    return this.state.inReset;
  }

  getClickHandler(index) {
    return () => {
      if (!this.isResetting()) {
        this.initiateFlip(index);
      }
    }
  }

  // @param shouldPropagate: boolean value signifying if a panel being flipped to 0 should cause the next panel to its left to flip
  rotate({shouldPropagate}) {
    let tempBitArray = [];

    let isNewValue = false;

    for (let index = 0; index < this.state.bitList.size; index += 1) {

      let immutObj = this.state.bitList.get(index);

      if (this.isResetting()) {
        if (immutObj.get('angle') !== 0) {
          immutObj = immutObj.set('angle', (immutObj.get('angle') + 1) % 360);
          if (immutObj.get('angle') === 0) {
            immutObj = immutObj.set('isRotating', false);
          }
        }
        tempBitArray.push(immutObj);
        continue;
      }

      // Rotate one degree and check if rotation is complete
      if (immutObj.get('isRotating')) {
        immutObj = immutObj.set('angle', (immutObj.get('angle') + 1) % 360);
        if (immutObj.get('angle') === 0 || immutObj.get('angle') === 180) {
          immutObj = immutObj.set('isRotating', false);
          isNewValue = true;

        }
      }

      tempBitArray.push(immutObj);
    }

    const newBitList = List(tempBitArray);
    const newNumberValue = this.getNumberValue(newBitList);

    let newResetValue = this.isResetting();

    const allPanelsHaveAngleOfZero = newBitList.filter(immutObj => immutObj.get('angle') !== 0).size === 0;

    if (this.isResetting && allPanelsHaveAngleOfZero) {
      newResetValue = false;
    }

    // If the rotation has resulted in a new guess (compared to before the rotation), make the guess and update the game
    if (isNewValue) {
      const updatedGame = makeGuess(this.state.game, this.getCurrentAnswer(newBitList), allPanelsHaveAngleOfZero);
      this.setState({
        game: updatedGame,
        bitList: newBitList,
        numberValue: newNumberValue,
        inReset: newResetValue
      })
    } else {
      this.setState({
        bitList: newBitList,
        numberValue: newNumberValue,
        inReset: newResetValue
      });
    }
  }

  // Get all the panels to rotate to show 0
  resetAllPanels() {
    if (this.state.numberValue === 0) {
      return;
    }

    const tempBitList = this.state.bitList.map(immutObj => {
      if (immutObj.get('angle') > 0) {
        return immutObj.set('isRotating', true);
      } else {
        return immutObj;
      }
    });

    this.setState({
      bitList: tempBitList,
      inReset: true
    });
  }

  // @param index: the index of the bit panel to be flipped
  initiateFlip(index) {
    if (index < this.state.bitList.size) {
      this.setState(previousState => {
        return {
          bitList: previousState.bitList.update(index, immutObj => immutObj.set('isRotating', true))
        };
      });
    }
  }

  // Return the current answer as an immutable list of 0's and 1's
  getCurrentAnswer(bitList) {
    return bitList.map(bitInfo => this.getNumberShowing(bitInfo.get('angle')));
  }

  // Given the angle of the panel, return the number that is showing (0 or 1)
  getNumberShowing(angle) {
    if (angle < 90 || angle >= 270) {
      return 0;
    } else {
      return 1;
    }
  }

  getNumberValue(bitList) {
    let sum = 0;

    for (let index = 0; index < bitList.size; index += 1) {
      const bit = this.getNumberShowing(bitList.get(index).get('angle'));

      if (bit === 1) {
        sum += Math.pow(2, -(index + 1));
      }
    }

    return sum;
  }

  componentDidMount() {
    setInterval(() => {
      // If at least one panel is rotating, call the rotate method
      if (this.state.bitList.filter(immutObj => immutObj.get('isRotating')).size > 0) {
        this.rotate({shouldPropagate: false})
      }
    }, 2);
  }

  getRoundMessage() {
    return getRoundStatus(this.state.game);
  }

  render() {
    const bitInfoArray = this.state.bitList.map((immutObj) => {
      return immutObj.toJS();
    }).toJS();

    const puzzleValueToGuess = getCurrentValueToGuess(this.state.game);

    return (
      <div className='BinaryFractionsMain'>
        {/* <div className='BinaryFractionsMain__value'>{this.state.numberValue}</div> */}
        <PrecisionGameViz numberOfBits={0} guessValue={this.state.numberValue} puzzleValue={puzzleValueToGuess} width={800}/>
        <BitPanelGroupWithPowerLabels bitInfoArray={bitInfoArray} showCalculatedPower={this.state.calculatePower} toggleCalculatedPower={() => {}} directionClass={'left-to-right'}/>
        <button className='button PrecisionGameMain__reset-button' onClick={this.resetAllPanels}>Reset</button>
        <div className='PrecisionGameMain__round-message'>{this.getRoundMessage()}</div>
      </div>
    )
  }
}

export default PrecisionGameMain;
