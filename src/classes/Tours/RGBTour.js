import Shepherd from 'tether-shepherd';
import _ from 'lodash';

import TimedFunctionCallSequence from '../TimedFunctionCallSequence/TimedFunctionCallSequence';

import './ShepherdStyles/shepherd-theme-dark-edit.css';

class RGBTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        showCancelLink: true,
      },
    });
    this.currentTourStep = 0;
    this.getCurrentTourStep = this.getCurrentTourStep.bind(this);
    this.setControlsDisabled = functions.setControlsDisabled;
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
    this.setControlsDisabled(false);
  }

  addTourSteps({
    toggleShowColorComponents,
    isShowingColorComponents,
    updateColor,
    setControlsDisabled,
    setCodeEditMode,
    addSymbolToCode,
    activateSymbolButtonInPanel,
    updateToFullCode
  }) {

    // Take a color code object and return a function that calls updateColor with fromTour equal to true, so it
    // will work even when the controls are disabled
    const getUpdateColorFromTourFunction = (colorCodeObject) => {
      return () => {
        updateColor({...colorCodeObject, fromTour: true});
      }
    }

    // Given an array of colors and a time interval to use for spacing them out,
    // return an array of objects ready to send to a TimedFunctionCallSequence
    const getFunctionCallObjectArray = ({colorArray, waitTime, tourStepItBelongsTo}) => {
      return _.map(colorArray, (color) => {
        return {
          callback: getUpdateColorFromTourFunction({newCode: color}),
          waitTime,
          tourStepItBelongsTo
        }
      });
    }

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

    const getShowFunction = ({initSequence, colorArray, waitTimeBetweenColors}) => {
      return () => {
        this.currentTourStep += 1;
        setControlsDisabled(true);

        const ensureIsFullCode = {
          callback: () => { updateToFullCode(true) },
          waitTime: 0,
          tourStepItBelongsTo: this.currentTourStep
        }

        initSequence = _.map(initSequence, (sequenceObject) => {
          return {...sequenceObject, tourStepItBelongsTo: this.currentTourStep};
        });

        let colorSequence = [];
        if (colorArray) {
          colorSequence = getFunctionCallObjectArray({
            colorArray,
            waitTime: waitTimeBetweenColors,
            tourStepItBelongsTo: this.currentTourStep
          });
        }

        const enableControls = {
          callback: () => { setControlsDisabled(false) },
          waitTime: 0,
          tourStepItBelongsTo: this.currentTourStep
        };

        let fullSequence = _.concat(ensureIsFullCode, initSequence, colorSequence, enableControls);

        const funcSequence = new TimedFunctionCallSequence({
          getCurrentTourStep: this.getCurrentTourStep,
          sequence: fullSequence
        });

        funcSequence.initiateSequence();
      };
    }

    this.tour.addStep('welcome', {
      text: 'Welcome to the RGB Color Explorer!',
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
    .addStep('mix', {
      title: 'Adding Light',
      text: 'Digital devices combine red, green, and blue light to make various colors.',
      attachTo: '.ColorViz__canvas bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: toggleShowColorComponents,
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: toggleShowColorComponents,
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { setControlsDisabled(false) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]
        })
      }
    })
    .addStep('dimmer', {
      title: 'Adjusting Light Levels',
      text: 'The red, green, and blue light intensities can be adjusted individually.',
      attachTo: '.ColorControlPanel__container top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: () => {
          let sequence = [];
          let nextWaitTime = 1000;

          if (!isShowingColorComponents()) {
            sequence.push({
              callback: toggleShowColorComponents,
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            })
            // Wait long enough to finish this animation before changing the colors.
            nextWaitTime = 2500;
          }
          sequence = _.concat(sequence, [
            {
              callback: getUpdateColorFromTourFunction({newBase: 2}),
              waitTime: nextWaitTime,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 1}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newCode: '111'}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]);

          // Get function and call immediately
          getShowFunction({
            initSequence: sequence,
            colorArray: [
              '011',
              '001',
              '101',
              '100',
              '110',
              '111'
            ],
            waitTimeBetweenColors: 1000
          })();
        }
      }
    })
    .addStep('binary', {
      title: 'Binary Color Codes',
      text: 'Binary codes can be used to represent the various combinations of red, green, and blue light intensities.',
      attachTo: '.ColorCodeControl__container bottom',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: getUpdateColorFromTourFunction({newBase: 2}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 1}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newCode: '111'}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          colorArray: [
            '011',
            '001',
            '101',
            '100',
            '110',
            '111'
          ],
          waitTimeBetweenColors: 1000
        })
      }
    })
    .addStep('moreBits', {
      title: 'More Bits, More Colors',
      text: 'Using more bits to create the code allows us to create a larger number of colors.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: getUpdateColorFromTourFunction({newBase: 2}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            // {
            //   callback: getUpdateColorFromTourFunction({newBitsPerComponent: 1}),
            //   waitTime: 0,
            //   tourStepItBelongsTo: this.currentTourStep
            // },
            // {
            //   callback: getUpdateColorFromTourFunction({newCode: '111'}),
            //   waitTime: 0,
            //   tourStepItBelongsTo: this.currentTourStep
            // },
            {
              callback: getUpdateColorFromTourFunction({newBase: 2}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 2}),
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newCode: '111111'}),
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          colorArray: [
            '101111',
            '011111',
            '011011',
            '010111',
            '010110',
            '010101',
            '100101',
            '110101',
            '111001',
            '111101',
            '111110',
            '111111'
          ],
          waitTimeBetweenColors: 600
        })
      }
    })
    .addStep('hex', {
      title: 'Hex Codes',
      text: 'When the binary codes start to get long, it is more convenient to use hexadecimal codes instead.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: getUpdateColorFromTourFunction({newBase: 16}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 4}),
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newCode: 'FFF'}),
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          colorArray: [
            'FEF',
            'FDF',
            'FDE',
            'FDD',
            'FDC',
            'FDB',
            'FDA',
            'FD9',
            'FD8',
            'ED8',
            'DD8',
            'CD8',
            'BD8'
          ],
          waitTimeBetweenColors: 600
        })
      }
    })
    .addStep('hex24', {
      title: 'Millions of Shades',
      text: 'With 24 bits, you can really fine tune your color shades!',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: getUpdateColorFromTourFunction({newBase: 16}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 8}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newCode: 'BBDD88'}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
          colorArray: [
            'BCDD88',
            'BDDD88',
            'BEDD88',
            'BEDC88',
            'BEDB88',
            'BEDA88',
            'BED988',
            'BED888',
            'BED788',
            'BED688',
            'BED687',
            'BED686',
            'BED685',
            'BED684',
            'BED683',
            'BED682',
            'BED681',
            'BED680'
          ],
          waitTimeBetweenColors: 300
        })
      }
    })
    .addStep('enterCode', {
      title: 'Type In Codes',
      text: 'If you click the code box you can type in a new code.',
      buttons: standardButtons,
      attachTo: '.ColorCodeControl__container top',
      when: {
        hide: this.onHide,
        show: getShowFunction({
          initSequence: [
            {
              callback: getUpdateColorFromTourFunction({newBase: 16}),
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: getUpdateColorFromTourFunction({newBitsPerComponent: 8}),
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { setCodeEditMode(true); },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('A');
                addSymbolToCode('A', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('9');
                addSymbolToCode('9', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('6');
                addSymbolToCode('6', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('5');
                addSymbolToCode('5', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('E');
                addSymbolToCode('E', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => {
                activateSymbolButtonInPanel('F');
                addSymbolToCode('F', true);
              },
              waitTime: 500,
              tourStepItBelongsTo: this.currentTourStep
            }
          ],
        })
      }
    })
    .addStep('explore', {
      text: 'Now it is your turn to explore. See what colors you can make!',
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
          setControlsDisabled(false);
        }
      }
    })
  }
}

export default RGBTour;
