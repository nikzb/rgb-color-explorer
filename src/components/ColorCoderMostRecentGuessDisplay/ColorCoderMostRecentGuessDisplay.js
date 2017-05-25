import React from 'react';

import ColorCodeComponentDisplay from  '../ColorCodeComponentDisplay/ColorCodeComponentDisplay';

import './ColorCoderMostRecentGuessDisplay.css';

const ColorCoderMostRecentGuessDisplay= ({colorCode}) => {

  const codeAsString = colorCode.getCode();

  let redCompString = '';
  let greenCompString = '';
  let blueCompString = '';

  if (colorCode.getFullCodeLength() === 3) {
    redCompString = codeAsString.slice(0, 1);
    greenCompString = codeAsString.slice(1, 2);
    blueCompString = codeAsString.slice(2, 3);
  } else if (colorCode.getFullCodeLength() === 6) {
    redCompString = codeAsString.slice(0, 2);
    greenCompString = codeAsString.slice(2, 4);
    blueCompString = codeAsString.slice(4, 6);
  } else {
    throw Error('Code Length is invalid (neither 3 or 6)');
  }

  const classNameRed = 'ColorCodeComponentDisplay ColorCodeComponentDisplay--red';
  const classNameGreen = 'ColorCodeComponentDisplay ColorCodeComponentDisplay--green';
  const classNameBlue = 'ColorCodeComponentDisplay ColorCodeComponentDisplay--blue';

  return (
    <div className='ColorCoderMostRecentGuessDisplay__container'>
      <ColorCodeComponentDisplay className={classNameRed} codeAsString={redCompString} />
      <ColorCodeComponentDisplay className={classNameGreen} codeAsString={greenCompString} />
      <ColorCodeComponentDisplay className={classNameBlue} codeAsString={blueCompString} />
    </div>
  );
}

export default ColorCoderMostRecentGuessDisplay;
