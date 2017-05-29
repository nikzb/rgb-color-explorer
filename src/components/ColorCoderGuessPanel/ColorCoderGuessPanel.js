import React from 'react';

import ColorCoderMostRecentGuessDisplay from '../ColorCoderMostRecentGuessDisplay/ColorCoderMostRecentGuessDisplay';
import ColorCoderGuessFeedbackDisplay from '../ColorCoderGuessFeedbackDisplay/ColorCoderGuessFeedbackDisplay';
import ColorDisplay from '../ColorDisplay/ColorDisplay';

import './ColorCoderGuessPanel.css';

const ColorCoderGuessPanel = ({currentPuzzle, puzzleNumber, readyToShowScore}) => {
  if (currentPuzzle.getNumberOfGuesses() === 0) {
    return (
      <div className={'ColorCoderGuessPanel__container ColorCoderGuessPanel__container--empty'}>
        <div className={'ColorCoderGuessPanel__round-number'}>Round {puzzleNumber}</div>
      </div>
    )
  // } else if (readyToShowScore) {
  //   return (
  //     <div className={'ColorCoderGuessPanel__container ColorCoderGuessPanel__container--empty'}>
  //       <div className={'ColorCoderGuessPanel__round-number'}>+{currentPuzzle.getScore()}</div>
  //     </div>
  //   );
  } else {
    let middleSection;
    if (readyToShowScore) {
      middleSection = <div className={'ColorCoderGuessPanel__points-earned'}>{`+${currentPuzzle.getScore()}`}</div>
    }
    else {
      middleSection = (
        <div className={'ColorCoderComponentsAndFeedbackDisplay'}>
          <ColorCoderMostRecentGuessDisplay colorCode={currentPuzzle.getMostRecentGuess()} />
          <ColorCoderGuessFeedbackDisplay componentDiffs={currentPuzzle.getComponentDiffsForMostRecentGuess()} codeLength={currentPuzzle.getActualColor().getFullCodeLength()} />
        </div>
      );
    }
    return (
      <div className={'ColorCoderGuessPanel__container'}>
        <div className={'ColorCoderGuessCountDisplay'}>
          <div className={'ColorCoderGuessCountDisplay__label'}>Guess</div>
          <div className={'ColorCoderGuessCountDisplay__count'}>{currentPuzzle.getNumberOfGuesses()}</div>
        </div>

        {middleSection}

        <ColorDisplay colorCode={currentPuzzle.getMostRecentGuess()} showColorComponents={false} userCanToggle={false} size={'tiny'}/>
      </div>
    )
  }
}

export default ColorCoderGuessPanel;
