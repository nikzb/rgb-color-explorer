import React from 'react';

import './ColorCoderComponentFeedbackDisplay.css';

const ColorCoderComponentFeedbackDisplay = ({className, componentDiff}) => {

  let symbolToShow;

  if (componentDiff > 0) {
    symbolToShow = '↓';
  } else if (componentDiff < 0) {
    symbolToShow = '↑';
  } else {
    symbolToShow = '✓';
  }

  return (
    <div className={className}>{symbolToShow}</div>
  );
}

export default ColorCoderComponentFeedbackDisplay;
