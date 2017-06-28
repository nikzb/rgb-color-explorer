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
      numberValue: 0
    };
  }

  getClickHandler(index) {
    return () => {
      this.initiateFlip(index);
    }
  }

  // @param index: the index of the bit panel to be rotated
  // @param firstIter: boolean value signifying if this is the initial rotation of this bit panel within this flip
  // @param shouldPropagate: boolean value signifying if a panel being flipped to 0 should cause the next panel to its left to flip
  rotate({index, firstIter, shouldPropagate}) {
    const angle = this.state.bitList.get(index).get('angle');

    const rotateOneDegree = (index) => {
      this.setState({
        bitList: this.state.bitList.update(index, mapThingy => mapThingy.set('angle', (angle + 1) % 360))
      });
    };

    if (firstIter || (angle !== 0 && angle !== 180)) {
      rotateOneDegree(index);
      setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate: true}) }, 2);
    } else {
      if (this.state.bitList.get(index).get('extraRotation')) {
        this.setState({
          bitList: this.state.bitList.update(index, mapThingy => mapThingy.set('extraRotation', false))
        });
        rotateOneDegree(index);
        setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate: true}) }, 2);
      }
    }

    this.updateNumberValue(this.state.numberValue);

    if (shouldPropagate && angle === 181) {
      this.initiateFlip(index + 1, false);
    }
  }

  isRotating(index) {
    const angle = this.state.bitList.get(index).get('angle');
    return angle !== 0 && angle !== 180;
  }

  // @param index: the index of the bit panel to be flipped
  initiateFlip(index) {
    const bitList = this.state.bitList;
    if (index < bitList.size) {
      if (this.isRotating(index) || bitList.get(index).get('extraRotation')) {
        this.setState({
          //bitList: bitList.get(index).set('extraRotation', true)
          bitList: bitList.update(index, mapThingy => mapThingy.set('extraRotation', true))
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

    if (newValue > oldValue || (oldValue === maxValue && newValue === 0)) {
      this.setState({
        numberValue: newValue
      });
    }
  }

  render() {
    const bitInfoArray = this.state.bitList.map((mapThingy) => {
      return mapThingy.toJS();
    }).toJS();

    return (
      <div className='BinaryCountingMain'>
        <div className='unsigned-int'>{this.state.numberValue}</div>
        <BitPanelGroupWithPowerLabels bitInfoArray={bitInfoArray} showCalculatedPower={false} />
      </div>
    )
  }
}

export default BinaryCountingMain;
