import Shepherd from 'tether-shepherd';
import _ from 'lodash';

import TimedFunctionCallSequence from '../TimedFunctionCallSequence/TimedFunctionCallSequence';

import './ShepherdStyles/shepherd-theme-dark-edit.css';

class ColorCoderTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        showCancelLink: true,
      },
    });
    this.currentTourStep = 0;
    this.getCurrentTourStep = this.getCurrentTourStep.bind(this);
    this.sendBackToLevelScreen = functions.setGameToNull;
    this.tour.on('complete', functions.setGameToNull);
    this.tour.on('cancel', () => {
      functions.setGameToNull();
      functions.setControlsDisabled(false);
    });

    this.addTourSteps(functions);
  }

  getTour() {
    return this.tour;
  }

  getCurrentTourStep() {
    return this.currentTourStep;
  }

  addTourSteps({ addSymbolToCode, activateSymbolButtonInPanel}) {
    const standardButtons = [
      // {
      //   text: 'Back',
      //   action: this.tour.back,
      //   classes: 'shepherd-button-secondary'
      // },
      {
        text: 'Next',
        action: this.tour.next
      }
    ];

    const getAddSymbolToCodeFromTourFunction = (symbol) => {
      return () => {
        activateSymbolButtonInPanel(symbol);
        addSymbolToCode(symbol, true);
      }
    }

    const getFunctionCallObjectArray = ({symbolArray, waitTime, tourStepItBelongsTo}) => {
      return _.map(symbolArray, (symbol) => {
        return {
          callback: getAddSymbolToCodeFromTourFunction(symbol),
          waitTime,
          tourStepItBelongsTo
        }
      });
    }

    const getShowFunction = ({initArray, symbolArray, postArray}) => {
      return () => {
        this.currentTourStep += 1;

        const initSequence = _.map(initArray, (sequenceObject) => {
          return {...sequenceObject, tourStepItBelongsTo: this.currentTourStep};
        })

        const buttonPushSequence = getFunctionCallObjectArray({
          symbolArray,
          waitTime: 500,
          tourStepItBelongsTo: this.currentTourStep
        });

        const postSequence = _.map(postArray, (sequenceObject) => {
          return {...sequenceObject, tourStepItBelongsTo: this.currentTourStep};
        })

        const funcSequence = new TimedFunctionCallSequence({
          getCurrentTourStep: this.getCurrentTourStep,
          sequence: _.concat(initSequence, buttonPushSequence, postSequence)
        });

        funcSequence.initiateSequence();
      }
    }

    this.tour.addStep('welcome', {
      text: "Let's play ColorCoder!",
      showCancelLink: false,
      buttons: [
        // {
        //   text: 'Exit',
        //   action: this.tour.hide
        // },
        {
          text: 'Next',
          action: this.tour.next
        }
      ],
      when: {
        show: () => {
          this.currentTourStep += 1;
        }
      }
    })
    .addStep('goal', {
      title: 'Find the Code',
      text: 'The goal is to find the RGB code for the color shown here with as few guesses as possible.',
      attachTo: '.ColorViz__canvas bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
    .addStep('firstAttempt', {
      text: 'Here goes our first guess!',
      attachTo: '.ColorCoderGuessInProgressDisplay__container top',
      showCancelLink: false,
      buttons: [],
      when: {
        show: getShowFunction({
          initArray: [
            {
              callback: () => { },
              waitTime: 2000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          symbolArray: ['1', '1', '0', '0', '1', '1'],
          postArray: [
            {
              callback: this.tour.next,
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('explainFeedback1', {
      title: 'Color Feedback',
      text: 'We have the perfect amount of red, but we need more green and less blue.',
      attachTo: '.ColorCoderGuessPanel__container bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
    .addStep('secondAttempt', {
      text: 'Here is our second guess:',
      attachTo: '.ColorCoderGuessInProgressDisplay__container top',
      showCancelLink: false,
      buttons: [],
      when: {
        show: getShowFunction({
          initArray: [
            {
              callback: () => { },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          symbolArray: ['1', '1', '1', '0', '1', '0'],
          postArray: [
            {
              callback: this.tour.next,
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('explainFeedback2', {
      title: 'More Feedback',
      text: 'Now we have the correct amount of red and blue, but we need less green.',
      attachTo: '.ColorCoderGuessPanel__container bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
    .addStep('thirdAttempt', {
      text: 'We are getting close!',
      attachTo: '.ColorCoderGuessInProgressDisplay__container top',
      showCancelLink: false,
      buttons: [],
      when: {
        show: getShowFunction({
          initArray: [
            {
              callback: () => { },
              waitTime: 1300,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          symbolArray: ['1', '1', '0', '1', '1', '0'],
          postArray: [
            {
              callback: this.tour.next,
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('puzzleSolved', {
      text: 'We found the code!',
      attachTo: '.ColorDisplay--level bottom',
      showCancelLink: false,
      buttons: [],
      when: {
        show: getShowFunction({
          postArray: [
            {
              callback: this.tour.next,
              waitTime: 2500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('points', {
      text: 'And earned 97 points!',
      attachTo: '.ColorCoderGuessPanel__container bottom',
      showCancelLink: false,
      buttons: [],
      when: {
        show: getShowFunction({
          postArray: [
            {
              callback: this.tour.next,
              waitTime: 3500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('rounds', {
      title: 'Go for 300!',
      text: 'There are 3 rounds, each earning you a maximum of 100 points',
      attachTo: '.ColorCoderGuessPanel__round-number bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
    .addStep('difficulty', {
      title: 'Like a Challenge?',
      text: 'For more challenging puzzles, try the intermediate or expert modes.',
      buttons: [
        {
          text: 'Done',
          action: this.tour.cancel
        }
      ],
      when: {
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
  }
}

export default ColorCoderTour;
