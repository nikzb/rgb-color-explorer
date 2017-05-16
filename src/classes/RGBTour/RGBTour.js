import Shepherd from 'tether-shepherd';

// import './ShepherdStyles/shepherd-theme-arrows.css';
// import './ShepherdStyles/shepherd-theme-default.css';
import './ShepherdStyles/shepherd-theme-dark.css';


class RGBTour {
  constructor(functions) {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        scrollTo: true,
      },
    });
    this.addTourSteps(functions);
  }

  getTour() {
    return this.tour;
  }

  // Updates the color, but only if the the tour step it belongs to is still active.
  // This check is needed because a tour step can be prematurely ended by clicking back or next
  updateIfStillActive({updateObject, stepItBelongsTo, updateColor}) {
    console.log(this.tour.getCurrentStep().id);
    console.log(stepItBelongsTo);
    console.log('active', updateColor);
    if (this.tour.getCurrentStep().id === stepItBelongsTo) {
      updateColor(updateObject);
    }
  }

  // Given an array of colors and a time interval to use for spacing them out,
  // update the colors every interval ms, but only if still part of the active step
  animateColorSequence({colors, interval, updateColor, step}) {
    console.log('animate', updateColor);
    colors.forEach((code, index) => {
      setTimeout(() => {
        this.updateIfStillActive({
          updateObject: {newCode: code},
          stepItBelongsTo: step,
          updateColor
        });
      }, (index + 1) * interval);
    });
  }

  addTourSteps({toggleShowColorComponents, updateColor}) {
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
      ]
    })
    .addStep('mix', {
      text: 'Digital devices mix red, green, and blue light to make various colors',
      attachTo: '.ColorViz__canvas bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          toggleShowColorComponents();
          setTimeout(toggleShowColorComponents, 3000);
        }
      }
    })
    .addStep('dimmer', {
      text: 'The red, green, and blue light intensities can be adjusted individually',
      attachTo: '.ColorControlPanel__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          setTimeout(() => {
            this.updateIfStillActive({
              updateObject: {
                newBase: 2
              },
              stepItBelongsTo: 'dimmer',
              updateColor
            });
            updateColor({
              newBase: 2
            });
            updateColor({
              newBitsPerComponent: 1
            });
            updateColor({
              newCode: '111'
            });
            const colors = [
              '011',
              '001',
              '101',
              '100',
              '110',
              '111'
            ];
            this.animateColorSequence({
              colors,
              updateColor,
              interval: 1000,
              step: 'dimmer'
            });
          }, 1000);
        }
      }
    })
    .addStep('binary', {
      text: 'Binary codes can be used to represent the various combinations of red, green, and blue light intensities',
      attachTo: '.ColorCodeControl__container bottom',
      buttons: standardButtons,
      when: {
        show: () => {
          updateColor({
            newBase: 2
          });
          updateColor({
            newBitsPerComponent: 1
          });
          updateColor({
            newCode: '111'
          });
          const colors = [
            '011',
            '001',
            '101',
            '100',
            '110',
            '111'
          ];
          this.animateColorSequence({
            colors,
            updateColor,
            interval: 1000,
            step: 'binary'
          });
        }
      }
    })
    .addStep('moreBits', {
      text: 'Using more bits to create the code allows us to create a larger number of colors',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          updateColor({
            newBase: 2
          });
          updateColor({
            newBitsPerComponent: 1
          });
          updateColor({
            newCode: '111'
          });

          setTimeout(() => {
            updateColor({
              newBase: 2
            });
            updateColor({
              newBitsPerComponent: 2
            });
            updateColor({
              newCode: '111111'
            });

            const colors = [
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
            this.animateColorSequence({
              colors,
              updateColor,
              interval: 600,
              step: 'moreBits'
            })
          }, 1000);
        }
      }
    })
    .addStep('hex', {
      text: 'When the binary codes start to get long, it is more convenient to use hexadecimal codes instead.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          setTimeout(() => {
            updateColor({
                newBase: 16
            });
            updateColor({
              newBitsPerComponent: 4
            });
            updateColor({
              newCode: 'FFF'
            });
            const colors = [
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
            this.animateColorSequence({
              colors,
              updateColor,
              interval: 600,
              step: 'hex'
            })
          }, 1000);
        }
      }
    })
    .addStep('hex24', {
      text: 'With 24 bits, you can really fine tune your color shades!',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons,
      when: {
        show: () => {
          setTimeout(() => {
            updateColor({
                newBase: 16
            });
            updateColor({
              newBitsPerComponent: 8
            });
            updateColor({
              newCode: 'BBDD88'
            });

            const colors= [
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
            this.animateColorSequence({
              colors,
              updateColor,
              interval: 300,
              step: 'hex24'
            })
          }, 1000);
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
      ]
    })
  }
}

export default RGBTour;
