import React from 'react';

import './BitPanel.css';

const BitPanel = ({angle, onClick}) => {
  const bitPanelStyleFront = {
    transform: `rotateX(${angle}deg`,
    fontSize: '1.8em'
  };

  let backAngle;

  if (angle > 180) {
    backAngle = angle - 180;
  } else {
    backAngle = angle + 180;
  }

  const bitPanelStyleBack = {
    transform: `rotateX(${backAngle}deg`,
    fontSize: '1.8em'
  };

  const BitPanelStyle = {
    width: '1.8em'
  }

  return (
    <div style={BitPanelStyle} className="BitPanel" onClick={onClick}>
      <div style={bitPanelStyleFront} className="BitPanel__face BitPanel__face-front">0</div>
      <div style={bitPanelStyleBack} className="BitPanel__face BitPanel__face-back">1</div>
    </div>
  );
};

export default BitPanel;
