import React from 'react';

import BitPanel from '../BitPanel/BitPanel';
import './BitPanelGroupWithPowerLabels.css';

// Props:
//  bitInfoArray: array of objects with info for each bit that will be shown, including the click handler
//  showCalculatedPower: boolean - true if should show calculated power instead of base / exponent
//  toggleCalculatedPower: function that toggles from calculated power to not
const BitPanelGroupWithPowerLabels = ({bitInfoArray, showCalculatedPower, toggleCalculatedPower}) => {
  const bitPanelsWithLabels = bitInfoArray.map((bitInfo, index) => {
    let powerDiv;
    if (showCalculatedPower) {
      powerDiv = <div className="PowerLabel" onClick={toggleCalculatedPower}>{Math.pow(2, bitInfo.index)}</div>
    } else {
      powerDiv = <div className="PowerLabel" onClick={toggleCalculatedPower}>{2}<sup>{bitInfo.index}</sup></div>;
    }
    return (
      <div key={index} className='BitPanelWithLabel'>
        {powerDiv}
        <BitPanel angle={bitInfo.angle} onClick={bitInfo.onClick} />
      </div>
    );
  });

  return (
    <div className="BitPanelGroupWithLabels">
      {bitPanelsWithLabels}
    </div>
  );
};

export default BitPanelGroupWithPowerLabels;
