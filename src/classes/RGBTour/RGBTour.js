import Shepherd from 'tether-shepherd';
import _ from 'lodash';

import TimedFunctionCallSequence from '../TimedFunctionCallSequence/TimedFunctionCallSequence';

// import './ShepherdStyles/shepherd-theme-arrows.css';
// import './ShepherdStyles/shepherd-theme-default.css';
import './ShepherdStyles/shepherd-theme-dark-edit.css';


class RGBTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        scrollTo: true,
      },
    });
    this.addTourSteps(functions);
    this.currentTourStep = 0;
    this.getCurrentTourStep = this.getCurrentTourStep.bind(this);
  }

  getTour() {
    return this.tour;
  }

  getCurrentTourStep() {
    return this.currentTourStep;
  }

  // Given an array of colors and a time interval to use for spacing them out,
  // return an array of objects ready to send to a TimedFunctionCallSequence
  getFunctionCallObjectArray({colorArray, updateColor, waitTime, tourStepItBelongsTo}) {
    return _.map(colorArray, (color) => {
      return {
        callback: () => { updateColor({newCode: color}) },
        waitTime,
        tourStepItBelongsTo
      }
    });
  }

  addTourSteps({toggleShowColorComponents, isShowingColorComponents, updateColor}) {
    const standardButtons = [
      {
        text: 'Back',
        action: this.tour.back
      },
      // {
      //   text: 'Replay',
      //   action: () => {
      //     this.tour.back();
      //     this.tour.next();
      //   }
      // },
      {
        text: 'Next',
        action: this.tour.next
      }
    ]

    this.tour.addStep('welcome', {
      text: 'Welcome to the RGB Color Explorer!',
      buttons: [
        {
          text: 'Skip',
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
        }
      }
    })
    .addStep('mix', {
      text: 'Digital devices mix red, green, and blue light to make various colors.',
      attachTo: '.ColorViz__canvas bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
          const sequence = [
            {
              callback: toggleShowColorComponents,
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: toggleShowColorComponents,
              waitTime: 3000,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();
        }
      }
    })
    .addStep('dimmer', {
      text: 'The red, green, and blue light intensities can be adjusted individually.',
      attachTo: '.ColorControlPanel__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
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
              callback: () => { updateColor({newBase: 2}) },
              waitTime: nextWaitTime,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 1}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: '111'}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]);

          const colorArray = [
            '011',
            '001',
            '101',
            '100',
            '110',
            '111'
          ];

          sequence = _.concat(sequence, this.getFunctionCallObjectArray({
            colorArray,
            updateColor,
            waitTime: 1000,
            tourStepItBelongsTo: this.currentTourStep,
          }));

          console.log('sequence with binary colors');
          console.log(sequence);

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();

        }
      }
    })
    .addStep('binary', {
      text: 'Binary codes can be used to represent the various combinations of red, green, and blue light intensities.',
      attachTo: '.ColorCodeControl__container bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
          let sequence = [
            {
              callback: () => { updateColor({newBase: 2}) },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 1}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: '111'}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]

          const colorArray = [
            '011',
            '001',
            '101',
            '100',
            '110',
            '111'
          ];

          sequence = _.concat(sequence, this.getFunctionCallObjectArray({
            colorArray,
            updateColor,
            waitTime: 1000,
            tourStepItBelongsTo: this.currentTourStep,
          }));

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();
        }
      }
    })
    .addStep('moreBits', {
      text: 'Using more bits to create the code allows us to create a larger number of colors.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
          let sequence = [
            {
              callback: () => { updateColor({newBase: 2}) },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 1}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: '111'}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBase: 2}) },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 2}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: '111111'}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            }
          ];

          const colorArray = [
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
          ];

          sequence = _.concat(sequence, this.getFunctionCallObjectArray({
            colorArray,
            updateColor,
            waitTime: 600,
            tourStepItBelongsTo: this.currentTourStep,
          }));

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();
        }
      }
    })
    .addStep('hex', {
      text: 'When the binary codes start to get long, it is more convenient to use hexadecimal codes instead.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
          let sequence = [
            {
              callback: () => { updateColor({newBase: 16}) },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 4}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: 'FFF'}) },
              waitTime: 0,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]

          const colorArray = [
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
          ];

          sequence = _.concat(sequence, this.getFunctionCallObjectArray({
            colorArray,
            updateColor,
            waitTime: 600,
            tourStepItBelongsTo: this.currentTourStep,
          }));

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();
        }
      }
    })
    .addStep('hex24', {
      text: 'With 24 bits, you can really fine tune your color shades!',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          this.currentTourStep += 1;
          let sequence = [
            {
              callback: () => { updateColor({newBase: 16}) },
              waitTime: 1000,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newBitsPerComponent: 8}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            },
            {
              callback: () => { updateColor({newCode: 'BBDD88'}) },
              waitTime: 1,
              tourStepItBelongsTo: this.currentTourStep
            }
          ]

          const colorArray = [
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
          ];

          sequence = _.concat(sequence, this.getFunctionCallObjectArray({
            colorArray,
            updateColor,
            waitTime: 300,
            tourStepItBelongsTo: this.currentTourStep,
          }));

          const funcSequence = new TimedFunctionCallSequence({
            getCurrentTourStep: this.getCurrentTourStep,
            sequence
          });

          funcSequence.initiateSequence();
        }
      }
    })
    .addStep('enterCode', {
      text: 'You can type in a code to see what color it makes.',
      buttons: standardButtons,
      attachTo: '.ColorCodeControl__container top',
      when: {
        show: () => {
          this.currentTourStep += 1;
        }
      }
    })
    .addStep('explore', {
      text: 'Now it is your turn to explore. See what colors you can make!',
      buttons: [
        {
          text: 'Replay the Tour',
          action: () => { this.tour.show('welcome') }
        },
        {
          text: 'Done',
          action: this.tour.hide
        }
      ],
      when: {
        show: () => {
          this.currentTourStep += 1;
        }
      }
    })
  }
}

export default RGBTour;
