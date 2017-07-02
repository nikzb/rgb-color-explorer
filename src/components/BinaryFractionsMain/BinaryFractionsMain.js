import React, { Component } from 'react';
import { Map, List } from 'immutable';

import BitPanelGroup from '../BitPanelGroup/BitPanelGroup';
import BitPanelGroupWithPowerLabels from '../BitPanelGroupWithPowerLabels/BitPanelGroupWithPowerLabels';

import './BinaryFractionsMain.css';

class BinaryFractionsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitList: List([
        Map({exponent: -1, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(0)}),
        Map({exponent: -2, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(1)}),
        Map({exponent: -3, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(2)}),
        Map({exponent: -4, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(3)})
      ]),
      numberValue: 0,
      inReset: false,
      calculatePower: true
    };
    this.resetAllPanels = this.resetAllPanels.bind(this);
    this.addBitPanel = this.addBitPanel.bind(this);
    this.removeBitPanel = this.removeBitPanel.bind(this);
    this.toggleCalculatedPower = this.toggleCalculatedPower.bind(this);
  }

  newBitPanelObject(index) {
    return Map({
      exponent: -1-this.state.bitList.size,
      angle: 0,
      isRotating: false,
      extraRotation: false,
      onClick: this.getClickHandler(this.state.bitList.size)
    })
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
    let initiateNextBit = false;

    let tempBitArray = [];

    for (let index = 0; index < this.state.bitList.size; index += 1) {

      let immutObj = this.state.bitList.get(index);

      if (this.isResetting()) {
        immutObj = immutObj.set('extraRotation', false);
        if (immutObj.get('angle') !== 0) {
          immutObj = immutObj.set('angle', (immutObj.get('angle') + 1) % 360);
          if (immutObj.get('angle') === 0) {
            immutObj = immutObj.set('isRotating', false);
          }
        }
        tempBitArray.push(immutObj);
        continue;
      }

      // Check if this bit is supposed to start flipping because of the previous bit going from 1 to 0
      if (initiateNextBit) {
        if (immutObj.get('isRotating')) {
          immutObj = immutObj.set('extraRotation', true);
        } else {
          immutObj = immutObj.set('isRotating', true);
        }
        initiateNextBit = false;
      }

      // Check if next bit should start flipping due to flipping this bit from 1 to 0
      if (immutObj.get('isRotating') && immutObj.get('angle') === 180 && index < this.state.bitList.size - 1 && shouldPropagate) {
          initiateNextBit = true;
      }

      // Rotate one degree and check if rotation is complete
      if (immutObj.get('isRotating')) {
        immutObj = immutObj.set('angle', (immutObj.get('angle') + 1) % 360);
        if (immutObj.get('angle') === 0 || immutObj.get('angle') === 180) {
          if (immutObj.get('extraRotation')) {
            immutObj = immutObj.set('extraRotation', false);
          }
          else {
            immutObj = immutObj.set('isRotating', false);
          }
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

    this.setState({
      bitList: newBitList,
      numberValue: newNumberValue,
      inReset: newResetValue
    });
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
      const immutObj = this.state.bitList.get(index);
      if (immutObj.get('isRotating')) {
        this.setState(previousState => {
          return {
            bitList: previousState.bitList.update(index, immutObj => immutObj.set('extraRotation', true))
          };
        });
      } else {
        this.setState(previousState => {
          return {
            bitList: previousState.bitList.update(index, immutObj => immutObj.set('isRotating', true))
          };
        });
      }
    }
  }

  getNumberValue(bitList) {
    const getNumberShowing = (angle) => {
      if (angle < 90 || angle >= 270) {
        return 0;
      } else {
        return 1;
      }
    }

    let sum = 0;

    for (let index = 0; index < bitList.size; index += 1) {
      const bit = getNumberShowing(bitList.get(index).get('angle'));

      if (bit === 1) {
        sum += Math.pow(2, -(index + 1));
      }
    }

    return sum;
  }

  addBitPanel() {
    if (this.state.bitList.size < 8) {
      this.setState(previousState => {
        return {
          bitList: previousState.bitList.push(this.newBitPanelObject())
        };
      });
    }
  }

  removeBitPanel() {
    if (this.state.bitList.size > 1) {
      const newBitList = this.state.bitList.delete(this.state.bitList.size - 1);
      const newNumberValue = this.getNumberValue(newBitList);
      this.setState({
        bitList: newBitList,
        numberValue: newNumberValue
      });
    }
  }

  toggleCalculatedPower() {
    this.setState((previousState) => {
      return {
        calculatePower: !previousState.calculatePower
      }
    });
  }

  componentDidMount() {
    setInterval(() => {
      // If at least one panel is rotating, call the rotate method
      if (this.state.bitList.filter(immutObj => immutObj.get('isRotating')).size > 0) {
        this.rotate({shouldPropagate: false})
      }
    }, 2);
  }

  render() {
    const bitInfoArray = this.state.bitList.map((immutObj) => {
      return immutObj.toJS();
    }).toJS();

    return (
      <div className='BinaryFractionsMain'>
        <div className='BinaryFractionsMain__value'>{this.state.numberValue}</div>
        <BitPanelGroupWithPowerLabels bitInfoArray={bitInfoArray} showCalculatedPower={this.state.calculatePower} toggleCalculatedPower={this.toggleCalculatedPower} directionClass={'left-to-right'}/>
        <button className='button BinaryFractionsMain__reset-button' onClick={this.resetAllPanels}>Reset</button>
        <div className='BinaryFractionsMain__bits-buttons-label'>Bits</div>
        <div className='BinaryFractionsMain__add-remove-button-container'>
          <button className='button' onClick={this.removeBitPanel}>-</button>
          <button className='button' onClick={this.addBitPanel}>+</button>
        </div>
      </div>
    )
  }
}

export default BinaryFractionsMain;