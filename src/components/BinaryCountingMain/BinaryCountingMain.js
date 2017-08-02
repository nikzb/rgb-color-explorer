import React, { Component } from 'react';
import { Map, List } from 'immutable';

import BitPanelGroupWithPowerLabels from '../BitPanelGroupWithPowerLabels/BitPanelGroupWithPowerLabels';
import SouvlakiTitle from '../SouvlakiTitle/SouvlakiTitle';
import NumberValueDisplay from '../NumberValueDisplay/NumberValueDisplay';
import MediaQueries from '../../classes/MediaQueries/MediaQueries';
import CountInBinaryTour from '../../classes/Tours/CountInBinaryTour';

import './BinaryCountingMain.css';

class BinaryCountingMain extends Component {
  constructor(props) {
    super(props);
    this.initiateFlip = this.initiateFlip.bind(this);
    this.resetAllPanels = this.resetAllPanels.bind(this);
    this.addBitPanel = this.addBitPanel.bind(this);
    this.removeBitPanel = this.removeBitPanel.bind(this);
    this.toggleCalculatedPower = this.toggleCalculatedPower.bind(this);
    this.activateButton = this.activateButton.bind(this);
    this.toggleShowSigned = this.toggleShowSigned.bind(this);

    this.state = {
      bitList: List([
        Map({exponent: 0, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(0)}),
        Map({exponent: 1, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(1)}),
        Map({exponent: 2, angle: 0, isRotating: false, extraRotation: false, onClick: this.getClickHandler(2)})
      ]),
      numberValue: 0,
      inReset: false,
      calculatePower: true,
      toggleCalculatedPowerActive: false,
      showSigned: false,
      addBitPanelButtonActive: false,
      removeBitPanelButtonActive: false,
      tour: (new CountInBinaryTour({
        toggleCalculatedPower: this.toggleCalculatedPower,
        initiateFlip: this.initiateFlip,
        addBitPanel: this.addBitPanel,
        removeBitPanel: this.removeBitPanel,
        resetAllPanels: this.resetAllPanels,
        activateButton: this.activateButton,
        toggleShowSigned: this.toggleShowSigned
      })).getTour()
    };
  }

  newBitPanelObject() {
    return Map({
      exponent: this.state.bitList.size,
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

  // This is used by the tour to demonstrate what happens when the show signed switch is toggled
  toggleShowSigned() {
    // Need to changed the checked value for the switch (which is really a checkbox)
    // ...

    this.setState({
      showSigned: !this.state.showSigned
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

  // Returns either 0 or 1 based on the angle of the bit panel
  getNumberShowing(angle) {
    if (angle < 90 || angle >= 270) {
      return 0;
    } else {
      return 1;
    }
  }


  getNumberValue(bitList) {
    // const getNumberShowing = (angle) => {
    //   if (angle < 90 || angle >= 270) {
    //     return 0;
    //   } else {
    //     return 1;
    //   }
    // }

    let binaryString = '';

    for (let index = 0; index < bitList.size; index += 1) {
      binaryString = this.getNumberShowing(bitList.get(index).get('angle')) + binaryString;
    }

    return parseInt(binaryString, 2);
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

  activateButton(buttonName) {
    if (buttonName === 'resetButton') {
      this.setState({
        resetButtonActive: true
      });
      setTimeout(() => {
        this.setState({
          resetButtonActive: false
        });
      }, 150);
    } else if (buttonName === 'addBitPanel') {
      this.setState({
        addBitPanelButtonActive: true
      });
      setTimeout(() => {
        this.setState({
          addBitPanelButtonActive: false
        });
      }, 150);
    } else if (buttonName === 'removeBitPanel') {
      this.setState({
        removeBitPanelButtonActive: true
      });
      setTimeout(() => {
        this.setState({
          removeBitPanelButtonActive: false
        });
      }, 150);
    } else if (buttonName === 'bitPanelLabels') {
      this.setState({
        toggleCalculatedPowerActive: true
      });
      setTimeout(() => {
        this.setState({
          toggleCalculatedPowerActive: false
        });
      }, 150);
    }
  }

  componentDidMount() {
    this.setState({
      rotateInterval: setInterval(() => {
        // If at least one panel is rotating, call the rotate method
        if (this.state.bitList.filter(immutObj => immutObj.get('isRotating')).size > 0) {
          this.rotate({shouldPropagate: true})
        }
      }, 2)
    });
    window.addEventListener('resize', this.handleResize);
    this.state.tour.start();
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.state.rotateInterval);
    this.state.tour.hide();
  }

  handleResize = () => {
    this.forceUpdate();
  };

  render() {
    const bitInfoArray = this.state.bitList.map((immutObj) => {
      return immutObj.toJS();
    }).toJS();

    const sizeMultiplier = MediaQueries.bitPanelSizeMultiplier();

    const numberValue = this.state.numberValue;
    let valueDiv;
    // If show signed switch is checked, need to show signed values next to unsigned

    let twosComplementValue;
    // If the leading bit is a 0, then the twosComplementValue is identical to the unsigned value, otherwise need to calculate
    if (this.getNumberShowing(this.state.bitList.get(-1).get('angle')) === 0) {
      twosComplementValue = numberValue;
    } else {
      twosComplementValue = numberValue - Math.pow(2, this.state.bitList.size);
    }

    if (this.state.showSigned) {
      valueDiv = (
        <div className='BinaryCountingMain__values'>
          <NumberValueDisplay title={'Unsigned'} value={numberValue} sizeMultiplier={sizeMultiplier} />
          <NumberValueDisplay title={'Signed'} value={twosComplementValue} sizeMultiplier={sizeMultiplier} />
        </div>
      );
    } else {
      valueDiv = (
        <div className='BinaryCountingMain__values'>
          <NumberValueDisplay title={'Base 10 Value'} value={numberValue} sizeMultiplier={sizeMultiplier} />
          <NumberValueDisplay styleToUse={{display: 'none'}} title={''} value={twosComplementValue} sizeMultiplier={sizeMultiplier} />
        </div>
      );
    }

    let resetButtonClasses = 'button BinaryCountingMain__reset-button';
    if (this.state.resetButtonActive) {
      resetButtonClasses += ' BinaryCountingMain__reset-button--active'
    }

    let addBitPanelButtonClasses = 'button BinaryCountingMain__add-remove-button';
    if (this.state.addBitPanelButtonActive) {
      addBitPanelButtonClasses += ' BinaryCountingMain__add-bit-panel-button--active'
    }

    let removeBitPanelButtonClasses = 'button BinaryCountingMain__add-remove-button';
    if (this.state.removeBitPanelButtonActive) {
      removeBitPanelButtonClasses += ' BinaryCountingMain__remove-bit-panel-button--active'
    }

    return (
      <div className='BinaryCountingMain'>
        <SouvlakiTitle title='Count in Binary' />
        {valueDiv}
        <div className='BinaryCountingMain__bit-display'>
          <BitPanelGroupWithPowerLabels bitInfoArray={bitInfoArray} showCalculatedPower={this.state.calculatePower} toggleCalculatedPower={this.toggleCalculatedPower} sizeMultiplier={sizeMultiplier} toggleCalculatedPowerActive={this.state.toggleCalculatedPowerActive}/>
        </div>
        <button className={resetButtonClasses} onClick={this.resetAllPanels}>Reset</button>
        <div className='BinaryCountingMain__bits-buttons-label'>Bits</div>
        <div className='BinaryCountingMain__add-remove-button-container'>
          <button className={removeBitPanelButtonClasses} onClick={this.removeBitPanel}>﹣</button>
          <button className={addBitPanelButtonClasses} onClick={this.addBitPanel}>+</button>
        </div>
        <div className='BinaryCountingMain__switch-label'>Signed Value</div>
        <div className="BinaryCountingMain__switch switch small">
          <input className="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch" />
          <label className="switch-paddle" htmlFor="exampleSwitch" onClick={() => { this.setState({showSigned: !this.state.showSigned});}}>
            <span className="show-for-sr">Show Signed Value</span>
          </label>
        </div>
      </div>
    )
  }
}

export default BinaryCountingMain;
