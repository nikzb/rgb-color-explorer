import React from 'react';

import BitPanel from '../BitPanel/BitPanel';
import './BitPanelGroup.css';

const BitPanelGroup = ({bitInfoArray}) => {
  const bitPanels = bitInfoArray.map((bitInfo, index) => {
    return <BitPanel key={index} angle={bitInfo.angle} onClick={bitInfo.onClick} />;
  });

  return (
    <div className="BitPanelGroup">
      {bitPanels}
    </div>
  );
};

export default BitPanelGroup;
