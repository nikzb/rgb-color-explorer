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
    this.onHide = this.onHide.bind(this);

    this.addTourSteps(functions);
  }

  getTour() {
    return this.tour;
  }

  getCurrentTourStep() {
    return this.currentTourStep;
  }

  onHide() {
    this.currentTourStep += 1;
    //this.setControlsDisabled(false);

    // send back to level page?
  }

  addTourSteps({ addSymbolToCode, activateSymbolButtonInPanel }) {
    const standardButtons = [
      {
        text: 'Back',
        action: this.tour.back,
        classes: 'shepherd-button-secondary'
      },
      {
        text: 'Next',
        action: this.tour.next
      }
    ];

    const getAddSymbolToCodeFromTourFunction = (symbol) => {
      return () => {
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

    const getShowFunction = ({initArray, symbolArray}) => {
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

        const funcSequence = new TimedFunctionCallSequence({
          getCurrentTourStep: this.getCurrentTourStep,
          sequence: _.concat(initSequence, buttonPushSequence)
        });

        funcSequence.initiateSequence();
      }
    }

    this.tour.addStep('welcome', {
      text: "Let's learn how to play ColorCoder!",
      showCancelLink: false,
      buttons: [
        {
          text: 'Exit',
          action: this.tour.hide
        },
        {
          text: 'Next',
          action: this.tour.next
        }
      ],
      when: {
        show: () => {
          this.currentTourStep += 1;
        },
        hide: this.onHide
      }
    })
    .addStep('goal', {
      title: 'Find the Code',
      text: 'The goal is to find the RGB code for the color shown here with as few guesses as you can.',
      attachTo: '.ColorViz__canvas bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: () => {
          this.currentTourStep += 1
        }
      }
    })
    .addStep('firstAttempt', {
      title: 'First Attempt',
      text: 'Here goes my first guess!',
      attachTo: '.ColorCoderGuessInProgressDisplay__container top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initArray: [
            {
              callback: () => { },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          symbolArray: ['0', '0', '1', '1', '1', '0']
        })
      }
    })

  }

}

export default ColorCoderTour;
