import React, { Component } from 'react';
import { Map, List } from 'immutable';

import BitPanelGroup from '../BitPanelGroup/BitPanelGroup';
import BitPanelGroupWithPowerLabels from '../BitPanelGroupWithPowerLabels/BitPanelGroupWithPowerLabels';

import './BinaryCountingMain.css';

class BinaryCountingMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitList: List([
        Map({angle: 0, extraRotation: false, onClick: this.getClickHandler(0)}),
        Map({angle: 0, extraRotation: false, onClick: this.getClickHandler(1)}),
        Map({angle: 0, extraRotation: false, onClick: this.getClickHandler(2)})
      ]),
      numberValue: 0,
      inReset: false
    };
    this.resetAllPanels = this.resetAllPanels.bind(this);
    this.addBitPanel = this.addBitPanel.bind(this);
    this.removeBitPanel = this.removeBitPanel.bind(this);
  }

  newBitPanelObject() {
    return Map({
      angle: 0,
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

  // @param index: the index of the bit panel to be rotated
  // @param firstIter: boolean value signifying if this is the initial rotation of this bit panel within this flip
  // @param shouldPropagate: boolean value signifying if a panel being flipped to 0 should cause the next panel to its left to flip
  rotate({index, firstIter, shouldPropagate}) {
    const waitTime = 2;
    const angle = this.state.bitList.get(index).get('angle');
    console.log(index + ' ' + angle);
    // console.log('index ' + index + ' angle ' + angle + ' should propogate ' + shouldPropagate + ' is resetting ' + this.state.bitList.get(index).get('resetting'));

    const rotateOneDegree = (index) => {
      this.setState(previousState => {
        return {
          bitList: previousState.bitList.update(index, immutObj => immutObj.set('angle', (angle + 1) % 360))
        }
      });
    };

    if (this.isResetting()) {
      if (angle === 0) {
        const totalAngle = this.state.bitList.reduce((acc, immutObj) => {
          return acc + immutObj.get('angle');
        }, 0);

        if (totalAngle === 0) {
          this.setState({
            inReset: false
          });
        }
      } else {
        rotateOneDegree(index);
        setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate: false }) }, waitTime);
      }
    } else {
      if (firstIter || (angle !== 0 && angle !== 180)) {
        if (firstIter && shouldPropagate && angle === 180) {
          this.initiateFlip(index + 1);
        }
        rotateOneDegree(index);
        setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate}) }, waitTime);
      } else {
        if (this.state.bitList.get(index).get('extraRotation')) {
          if (shouldPropagate && angle === 180) {
            this.initiateFlip(index + 1);
          }
           this.setState(previousState => {
            return {
              bitList: previousState.bitList.update(index, immutObj => immutObj.set('extraRotation', false))
            }
          });
          rotateOneDegree(index);
          setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate}) }, waitTime);
        }
      }
    }

    this.updateNumberValue(this.state.numberValue);

    // if (shouldPropagate && angle === 181) {
    //   this.initiateFlip(index + 1);
    // }
  }

  // Take the index of where to look in bitList and return true if that panel is currently rotating
  isRotating(index) {
    const angle = this.state.bitList.get(index).get('angle');
    return angle !== 0 && angle !== 180;
  }

  // Get all the panels to rotate to show 0
  resetAllPanels() {
    if (this.state.numberValue === 0) {
      return;
    }

    this.setState({
      inReset: true
    }, () => {
      this.state.bitList.forEach((immutObj, index) => {
        if (!this.isRotating(index) && immutObj.get('angle') === 180) {
          this.rotate({index, firstIter: true, shouldPropagate: false});
        }
      });
    });
  }

  // @param index: the index of the bit panel to be flipped
  initiateFlip(index) {
    if (index < this.state.bitList.size) {
      if (this.isRotating(index) || this.state.bitList.get(index).get('extraRotation')) {
        this.setState(previousState => {
          return {
            bitList: previousState.bitList.update(index, immutObj => immutObj.set('extraRotation', true))
          }
        });
      } else {
        this.rotate({index, firstIter: true, shouldPropagate: true});
      }
    }
  }

  // Value must go up except if overflowing back to 0.
  // The oldValue parameter is used to enforce this rule. This is necessary because of a bug that causes the wrong value to be returned in some cases, due to timing issues.
  updateNumberValue(oldValue) {
    const getNumberShowing = (angle) => {
      if (angle < 90 || angle >= 270) {
        return 0;
      } else {
        return 1;
      }
    }

    let binaryString = '';

    for (let index = 0; index < this.state.bitList.size; index += 1) {
      binaryString = getNumberShowing(this.state.bitList.get(index).get('angle')) + binaryString;
    }

    const newValue = parseInt(binaryString, 2);
    const maxValue = Math.pow(2, this.state.bitList.size) - 1;

    console.log('old vs new' + oldValue + ' ' + newValue);

    this.setState({
      numberValue: newValue
    });

    // if (newValue > oldValue || (oldValue === maxValue && newValue === 0)) {
    //   this.setState({
    //     numberValue: newValue
    //   });
    // }
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
      this.setState({
        bitList: this.state.bitList.delete(this.state.bitList.size - 1)
      }, () => { this.updateNumberValue(-1); } );
    }
  }

  render() {
    const bitInfoArray = this.state.bitList.map((immutObj) => {
      return immutObj.toJS();
    }).toJS();

    return (
      <div className='BinaryCountingMain'>
        <div className='BinaryCountingMain__unsigned-int'>{this.state.numberValue}</div>
        <BitPanelGroupWithPowerLabels bitInfoArray={bitInfoArray} showCalculatedPower={false} />
        <button className='button BinaryCountingMain__reset-button' onClick={this.resetAllPanels}>Reset</button>
        <div className='BinaryCountingMain__add-remove-button-container'>
          <button className='button' onClick={this.removeBitPanel}>-</button>
          <button className='button' onClick={this.addBitPanel}>+</button>
        </div>
      </div>
    )
  }
}

export default BinaryCountingMain;
