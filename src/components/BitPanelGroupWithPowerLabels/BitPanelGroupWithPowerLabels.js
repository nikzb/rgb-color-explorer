import React from 'react';
import browser from 'detect-browser';

import BitPanel from '../BitPanel/BitPanel';
import './BitPanelGroupWithPowerLabels.css';

// Props:
//  bitInfoArray: array of objects with info for each bit that will be shown, including the click handler
//  showCalculatedPower: boolean - true if should show calculated power instead of base / exponent
//  toggleCalculatedPower: function that toggles from calculated power to not
const BitPanelGroupWithPowerLabels = ({bitInfoArray, showCalculatedPower, toggleCalculatedPower, directionClass='', sizeMultiplier}) => {
  if (sizeMultiplier > 1.2) {
    sizeMultiplier *= 1.5;
  }
  const bitPanelsWithLabels = bitInfoArray.map((bitInfo, index) => {

    const powerDivStyle = {
      fontSize: `${0.7*sizeMultiplier}em`,
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
        <BitPanel angle={bitInfo.angle} onClick={bitInfo.onClick} sizeMultiplier={sizeMultiplier}/>
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
