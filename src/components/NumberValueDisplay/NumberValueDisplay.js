import React from 'react';

import './NumberValueDisplay.css';

const NumberValueDisplay = ({title, value, sizeMultiplier, styleToUse={}}) => {
  let valueStyle = {
      fontSize: `${3*sizeMultiplier}em`//'3em'
  }

  if (sizeMultiplier > 1.2) {
    valueStyle = {
        fontSize: `${4*sizeMultiplier}em`//'3em'
    }
  }

  return (
    <div style={styleToUse} className='NumberValueDisplay__container'>
      <div className='NumberValueDisplay__title'>{title}</div>
      <div style={valueStyle} className='NumberValueDisplay__value'>{value}</div>
    </div>
  );
}

export default NumberValueDisplay;
