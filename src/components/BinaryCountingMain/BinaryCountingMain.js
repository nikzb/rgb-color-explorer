import React, { Component } from 'react';
import { Map, List } from 'immutable';

import BitPanelGroup from '../BitPanelGroup/BitPanelGroup';

import './BinaryCountingMain.css';

class BinaryCountingMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bitList: List([
        Map({angle: 0, onClick: this.getClickHandler(0)}),
        Map({angle: 0, onClick: this.getClickHandler(1)}),
        Map({angle: 0, onClick: this.getClickHandler(2)})
      ])
    };
      // bitInfoArray: [
      //   {angle: 0, interval: null},
      //   {angle: 0, interval: null},
      //   {angle: 0, interval: null}
      // ]
  }

  getClickHandler(index) {
    return () => {
      this.initiateFlip(index);
    }
  }

  // @param index: the index of the bit panel to be rotated
  // @param firstIter: boolean value signifying that this is the initial rotation of this bit panel within this flip
  rotate(index, firstIter) {
    const bitList = this.state.bitList;
    const angle = bitList.get(index).get('angle');

    const rotateOneDegree = () => {
      this.setState({
        bitList: bitList.update(index, mapThingy => mapThingy.set('angle', (angle + 1) % 360))
      });
    };

    if (firstIter || (angle !== 0 && angle !== 180)) {
      rotateOneDegree();
      setTimeout(() => { this.rotate(index, false) }, 2);
    }
  }

  // @param index: the index of the bit panel to be flipped
  initiateFlip(index) {
    this.rotate(index, true);
  }

  render() {
    const bitInfoArray = this.state.bitList.map((mapThingy) => {
      return mapThingy.toJS();
    }).toJS();

    return (
      <div className='BinaryCountingMain'>
        <BitPanelGroup bitInfoArray={bitInfoArray} />
      </div>
    )
  }
}

export default BinaryCountingMain;
