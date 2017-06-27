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
      this.initiateFlip(index, true);
    }
  }

  // @param index: the index of the bit panel to be rotated
  // @param firstIter: boolean value signifying if this is the initial rotation of this bit panel within this flip
  // @param shouldPropagate: boolean value signifying if a panel being flipped to 0 should cause the next panel to its left to flip
  rotate({index, firstIter, shouldPropagate, fromClick}) {
    const bitList = this.state.bitList;
    const angle = bitList.get(index).get('angle');

    const rotateOneDegree = (index) => {
      this.setState({
        bitList: bitList.update(index, mapThingy => mapThingy.set('angle', (angle + 1) % 360))
      });
    };

    // if (firstIter || (angle !== 0 && angle !== 180)) {
    //   rotateOneDegree(index);
    //   setTimeout(() => { this.rotate(index, false) }, 2);
    // } else if (angle === 0) {
    //   this.initiateFlip(index + 1);
    // }

    // if (firstIter || (angle !== 0 && angle !== 180)) {
    //   rotateOneDegree(index);
    //   let time = 10;
    //   if (!fromClick) {
    //     time = 1;
    //   }
    //   setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate: true, fromClick}) }, time);
    // }
    //
    // if (shouldPropagate && angle === 181) {
    //   this.initiateFlip(index + 1, false);
    // }

    if (firstIter || (angle !== 0 && angle !== 180)) {
      rotateOneDegree(index);
      let time = 11.8;
      if (!fromClick) {
        time = 1;
      }
      setTimeout(() => { this.rotate({index, firstIter: false, shouldPropagate: true, fromClick}) }, 2);
    }

    if (shouldPropagate && angle === 181) {
      this.initiateFlip(index + 1, false);
    }


  }

  // @param index: the index of the bit panel to be flipped
  initiateFlip(index, fromClick) {
    // debugger;
    if (index < this.state.bitList.size) {
      this.rotate({index, firstIter: true, shouldPropagate: true, fromClick});
    }
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
