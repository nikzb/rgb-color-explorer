import Shepherd from 'tether-shepherd';

import TimedFunctionCallSequence from '../TimedFunctionCallSequence/TimedFunctionCallSequence';

import './ShepherdStyles/shepherd-theme-bright.css';

class CountInBinaryTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-bright',
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
    activateButton,
    toggleShowSigned
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
      text: "Let's learn how to count in binary!",
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
      title: 'Powers of 2',
      text: 'Binary numbers use powers of two. Clicking the powers shows you what the exponents are.',
      attachTo: '.BinaryCountingMain__bit-display top',
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
      title: 'Flip It',
      text: 'Clicking a bit panel flips it from 0 to 1, adding the labeled amount to your number.',
      attachTo: '.BinaryCountingMain__bit-display bottom',
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
    .addStep('flipPanelAgain', {
      title: 'Flip It Again',
      text: 'Clicking the same bit panel again flips it from 1 to 0, and then causes the next bit to the left to flip too.',
      attachTo: '.BinaryCountingMain__bit-display bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: () => { initiateFlip(0); },
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { initiateFlip(0); },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { initiateFlip(0); },
              waitTime: 1500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('moreBits', {
      title: 'More Bits',
      text: 'Clicking the + button increases the number of bits available. The maximum allowed is 8.',
      attachTo: '.BinaryCountingMain__add-remove-button-container bottom',
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
            },
            {
              callback: () => {
                activateButton('removeBitPanel');
                removeBitPanel();
              },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateButton('removeBitPanel');
                removeBitPanel();
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateButton('removeBitPanel');
                removeBitPanel();
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('signedValues', {
      title: 'Negative Values',
      text: 'So far all the values have been positive or zero. To include negative values, we can turn on the Signed Values option.',
      attachTo: '.BinaryCountingMain__switch bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: toggleShowSigned,
              waitTime: 4000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: toggleShowSigned,
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
          ]
        })
      }
    })
    .addStep('resetPanels', {
      title: 'Start Fresh',
      text: 'Clicking the Reset button will start you back at 0.',
      attachTo: '.BinaryCountingMain__reset-button bottom',
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
      text: 'Now it is your turn to explore. Keep clicking the right most bit to see the pattern for counting in binary.<br><br>You can also click other bits to count by larger amounts.',
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

export default CountInBinaryTour;
