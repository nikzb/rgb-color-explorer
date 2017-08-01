import Shepherd from 'tether-shepherd';

import TimedFunctionCallSequence from '../TimedFunctionCallSequence/TimedFunctionCallSequence';

import './ShepherdStyles/shepherd-theme-dark-edit.css';

class FractionsTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        showCancelLink: true,
      },
    });
    this.currentTourStep = 0;
    this.getCurrentTourStep = this.getCurrentTourStep.bind(this);
    // this.setControlsDisabled = functions.setControlsDisabled;
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
  }

  addTourSteps({
    toggleCalculatedPower,
    initiateFlip,
    addBitPanel,
    removeBitPanel,
    resetAllPanels,
    activateButton
  }) {
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

    const getShowFunction = ({initSequence}) => {
      return () => {
        this.currentTourStep += 1;

        initSequence = initSequence.map((sequenceObject) => {
          return {...sequenceObject, tourStepItBelongsTo: this.currentTourStep};
        });

        const funcSequence = new TimedFunctionCallSequence({
          getCurrentTourStep: this.getCurrentTourStep,
          sequence: initSequence
        });

        funcSequence.initiateSequence();
      }
    }

    this.tour.addStep('welcome', {
      text: 'Welcome to the Binary Fractions Explorer!<br><br>We will learn how to use 0\'s and 1\'s to represent fractional numbers.',
      showCancelLink: false,
      buttons: [
        {
          text: 'Skip',
          action: this.tour.hide,
          classes: 'shepherd-button-secondary'
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
    .addStep('powers', {
      text: 'Binary uses powers of two. Clicking the powers shows you what the exponents are.',
      attachTo: '.BinaryFractionsMain__bit-display top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => {
                activateButton('bitPanelLabels');
                toggleCalculatedPower();
              },
              waitTime: 4000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateButton('bitPanelLabels');
                toggleCalculatedPower();
              },
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
          ]
        })
      }
    })
    .addStep('flipPanel', {
      text: 'Clicking a bit panel flips it from 0 to 1, adding the labeled amount to your fraction.',
      attachTo: '.BinaryFractionsMain__bit-display bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => { initiateFlip(0); },
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('flipMorePanels', {
      text: 'Clicking more panels will allow you to create different fractions.',
      attachTo: '.BinaryFractionsMain__bit-display bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => { initiateFlip(1); },
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { initiateFlip(3); },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { initiateFlip(0); },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { initiateFlip(2); },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('moreBits', {
      text: 'Clicking the + button increases the number of bits available. (The max is 8)',
      attachTo: '.BinaryFractionsMain__add-remove-button-container bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => {
                activateButton('addBitPanel');
                addBitPanel();
              },
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateButton('addBitPanel');
                addBitPanel();
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateButton('addBitPanel');
                addBitPanel();
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('resetPanels', {
      text: 'To start from 0 again, click the Reset button.',
      attachTo: '.BinaryFractionsMain__reset-button bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => {
                activateButton('resetButton');
                resetAllPanels();
              },
              waitTime: 2000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('explore', {
      text: 'Now it is your turn to explore. Try creating different fractions to see what you can make and what you cannot!',
      showCancelLink: false,
      buttons: [
        {
          text: 'Restart',
          classes: 'shepherd-button-secondary',
          action: () => { this.tour.show('welcome') }
        },
        {
          text: 'OK',
          action: this.tour.hide
        }
      ],
      when: {
        hide: this.onHide,
        show: () => {
          this.currentTourStep += 1;
          // setControlsDisabled(false);
        }
      }
    })
  }
}

export default FractionsTour;
