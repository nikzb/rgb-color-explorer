import React from 'react';

import './BitPanel.css';

const BitPanel = ({angle, onClick}) => {
  const bitPanelStyleFront = {
    transform: `rotateX(${angle}deg`
  };

  let backAngle;

  if (angle > 180) {
    backAngle = angle - 180;
  } else {
    backAngle = angle + 180;
  }

  const bitPanelStyleBack = {
    transform: `rotateX(${backAngle}deg`
  };

  return (
    <div className="BitPanel" onClick={onClick}>
      <div style={bitPanelStyleFront} className="BitPanel__face BitPanel__face-front" onClick={onClick}>0</div>
      <div style={bitPanelStyleBack} className="BitPanel__face BitPanel__face-back" onClick={onClick}>1</div>
    </div>
  );
};

export default BitPanel;
