import React from 'react';

import BitPanel from '../BitPanel/BitPanel';
import './BitPanelGroupWithPowerLabels.css';

const BitPanelGroupWithPowerLabels = ({bitInfoArray, showCalculatedPower}) => {
  console.log(bitInfoArray);
  const bitPanelsWithLabels = bitInfoArray.map((bitInfo, index) => {
    let powerDiv;
    if (showCalculatedPower) {
      powerDiv = <div className="PowerLabel">{Math.pow(2, index)}</div>
    } else {
      powerDiv = <div className="PowerLabel">{2}<sup>{index}</sup></div>;
    }
    return (
      <div key={index}>
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
