import React from 'react';
import browser from 'detect-browser';
import { List } from 'immutable';

import BitPanel from '../BitPanel/BitPanel';
import './BitPanelGroupWithPowerLabels.css';

// Props:
//  bitInfoArray: array of objects with info for each bit that will be shown, including the click handler
//  showCalculatedPower: boolean - true if should show calculated power instead of base / exponent
//  toggleCalculatedPower: function that toggles from calculated power to not
//  activeBitPanelsByIndex: an immutable.js List of the bit panels that are currently "active" meaning showing that they are being clicked (or in a simulated click for a tour)
const BitPanelGroupWithPowerLabels = ({bitInfoArray, showCalculatedPower, toggleCalculatedPower, directionClass='', sizeMultiplier, toggleCalculatedPowerActive=false, activeBitPanelsByIndex=List()}) => {
  if (sizeMultiplier > 1.2) {
    sizeMultiplier *= 1.5;
  }
  const bitPanelsWithLabels = bitInfoArray.map((bitInfo, index) => {

    let powerDivStyle = {
      fontSize: `${0.7*sizeMultiplier}em`,
    }

    if (toggleCalculatedPowerActive) {
      powerDivStyle.color = '#EEE';
      powerDivStyle.background = '#AAA';
    }

    if (sizeMultiplier > 1.2) {
      powerDivStyle.left = `${0.05 * sizeMultiplier}em`;
    }

    let bitPanelWithLabelStyle = {
      width: `${2.3*sizeMultiplier}em`
    }

    if (browser && (browser.name === 'chrome' || browser.name === 'safari')) {
      bitPanelWithLabelStyle = {
        width: `${2.3*sizeMultiplier}em`,
        zIndex: '-1'
      }
    }

    let powerDiv;
    if (showCalculatedPower) {
      let calculatedPower;
      if (bitInfo.exponent >= 0) {
        calculatedPower = Math.pow(2, bitInfo.exponent);
      } else {
        calculatedPower = <span><sup>{1}</sup>{'\u2044'}<sub>{Math.pow(2, -bitInfo.exponent)}</sub></span>;
      }
      powerDiv = <div style={powerDivStyle} className="BitPanelWithLabel__power" onClick={toggleCalculatedPower}>{calculatedPower}</div>;
    } else {
      powerDiv = <div style={powerDivStyle} className="BitPanelWithLabel__power" onClick={toggleCalculatedPower}>{2}<sup>{bitInfo.exponent}</sup></div>;
    }

    return (
      <div key={index} style={bitPanelWithLabelStyle} className='BitPanelWithLabel'>
        {powerDiv}
        <BitPanel angle={bitInfo.angle} onClick={bitInfo.onClick} sizeMultiplier={sizeMultiplier} active={activeBitPanelsByIndex.has(index)}/>
      </div>
    );
  });

  const classes = `BitPanelGroupWithLabels BitPanelGroupWithLabels--${directionClass}`;

  const BitPanelGroupStyle = {
    height: `${4.5*sizeMultiplier}em`
  }

  return (
    <div style={BitPanelGroupStyle} className={classes}>
      {bitPanelsWithLabels}
    </div>
  );
};

export default BitPanelGroupWithPowerLabels;
