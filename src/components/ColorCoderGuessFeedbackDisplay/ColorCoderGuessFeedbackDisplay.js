import React from 'react';

import ColorCoderComponentFeedbackDisplay from  '../ColorCoderComponentFeedbackDisplay/ColorCoderComponentFeedbackDisplay';

import './ColorCoderGuessFeedbackDisplay.css';

const ColorCoderGuessFeedbackDisplay= ({componentDiffs}) => {

  const classNameRed = 'ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--red';
  const classNameGreen = 'ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--green';
  const classNameBlue = 'ColorCoderComponentFeedbackDisplay ColorCoderComponentFeedbackDisplay--blue';

  return (
    <div className='ColorCoderGuessFeedbackDisplay__container'>
      <ColorCoderComponentFeedbackDisplay className={classNameRed} componentDiff={componentDiffs.red} />
      <ColorCoderComponentFeedbackDisplay className={classNameGreen} componentDiff={componentDiffs.green} />
      <ColorCoderComponentFeedbackDisplay className={classNameBlue} componentDiff={componentDiffs.blue} />
    </div>
  );
}

export default ColorCoderGuessFeedbackDisplay;
