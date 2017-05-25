import React from 'react';

import ColorCoderMostRecentGuessDisplay from '../ColorCoderMostRecentGuessDisplay/ColorCoderMostRecentGuessDisplay';
import ColorCoderGuessFeedbackDisplay from '../ColorCoderGuessFeedbackDisplay/ColorCoderGuessFeedbackDisplay';
import ColorDisplay from '../ColorDisplay/ColorDisplay';

import './ColorCoderGuessPanel.css';

const ColorCoderGuessPanel = ({currentPuzzle}) => {
  if (currentPuzzle.getNumberOfGuesses() === 0) {
    return (
      <div className={'ColorCoderGuessPanel__container'}>
        <div className={'ColorCoderGuessCountDisplay'}>
          <div className={'ColorCoderGuessCountDisplay__label'}>Guess</div>
          <div className={'ColorCoderGuessCountDisplay__count'}>{currentPuzzle.getNumberOfGuesses()}</div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={'ColorCoderGuessPanel__container'}>
        <div className={'ColorCoderGuessCountDisplay'}>
          <div className={'ColorCoderGuessCountDisplay__label'}>Guess</div>
          <div className={'ColorCoderGuessCountDisplay__count'}>{currentPuzzle.getNumberOfGuesses()}</div>
        </div>

        <div className={'ColorCoderComponentsAndFeedbackDisplay'}>
          <ColorCoderMostRecentGuessDisplay colorCode={currentPuzzle.getMostRecentGuess()} />
          <ColorCoderGuessFeedbackDisplay componentDiffs={currentPuzzle.getComponentDiffsForMostRecentGuess()} codeLength={currentPuzzle.getActualColor().getFullCodeLength()} />
        </div>

        <ColorDisplay colorCode={currentPuzzle.getMostRecentGuess()} showColorComponents={false} userCanToggle={false} size={'tiny'}/>
      </div>
    )
  }
}

export default ColorCoderGuessPanel;
