import React from 'react';

import './BitPanel.css';

const BitPanel = ({angle, onClick, sizeMultiplier, active}) => {
  const bitPanelStyleFront = {
    transform: `rotateX(${angle}deg)`,
    // MozTransform: `rotateX(${angle}deg)`,
    fontSize: `${1.8*sizeMultiplier}em`
  };

  let backAngle;

  if (angle > 180) {
    backAngle = angle - 180;
  } else {
    backAngle = angle + 180;
  }

  const bitPanelStyleBack = {
    transform: `rotateX(${backAngle}deg)`,
    // MozTransform: `rotateX(${backAngle}deg)`,
    fontSize: `${1.8*sizeMultiplier}em`
  };

  let BitPanelStyle = {
    width: `${1.8*sizeMultiplier}em`
  };

  if (sizeMultiplier > 1.2) {
    BitPanelStyle = {
      width: `${1.8*sizeMultiplier}em`,
      left: `${-0.1*sizeMultiplier}em`
    }
  }

  let frontClasses = 'BitPanel__face BitPanel__face-front';
  let backClasses = 'BitPanel__face BitPanel__face-back';

  if (active) {
    frontClasses += ' BitPanel__face-front--active';
    backClasses += ' BitPanel__face-back--active';
  }

  return (
    <div style={BitPanelStyle} className='BitPanel' onClick={onClick}>
      <div style={bitPanelStyleFront} className={frontClasses}>0</div>
      <div style={bitPanelStyleBack} className={backClasses}>1</div>
    </div>
  );
};

export default BitPanel;
