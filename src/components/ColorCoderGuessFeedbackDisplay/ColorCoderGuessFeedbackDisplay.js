import React from 'react';

import ColorCoderComponentFeedbackDisplay from  '../ColorCoderComponentFeedbackDisplay/ColorCoderComponentFeedbackDisplay';

import './ColorCoderGuessFeedbackDisplay.css';

const ColorCoderGuessFeedbackDisplay= ({componentDiffs, codeLength}) => {

  let spacingClass;
  if (codeLength === 3) {
    spacingClass = 'ColorCoderComponentFeedbackDisplay--three-symbols';
  } else if (codeLength === 6) {
    spacingClass = 'ColorCoderComponentFeedbackDisplay--six-symbols';
  } else {
    throw Error('code length is invalid. It is neither 3 nor 6.');
  }

  const classNameRed = spacingClass + ' ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--red';
  const classNameGreen = spacingClass + ' ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--green';
  const classNameBlue = spacingClass + ' ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--blue';

  return (
    <div className='ColorCoderGuessFeedbackDisplay__container'>
      <ColorCoderComponentFeedbackDisplay className={classNameRed} componentDiff={componentDiffs.red} />
      <ColorCoderComponentFeedbackDisplay className={classNameGreen} componentDiff={componentDiffs.green} />
      <ColorCoderComponentFeedbackDisplay className={classNameBlue} componentDiff={componentDiffs.blue} />
    </div>
  );
}

export default ColorCoderGuessFeedbackDisplay;
