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
            updateColor({
              newBase: 2
            });
            updateColor({
              newBitsPerComponent: 1
            });
            updateColor({
              newCode: '111'
            });
            const timeStep = 1000;
            setTimeout(() => { updateColor({ newCode: '011'}) }, timeStep);
            setTimeout(() => { updateColor({ newCode: '001'}) }, timeStep * 2);
            setTimeout(() => { updateColor({ newCode: '101'}) }, timeStep * 3);
            setTimeout(() => { updateColor({ newCode: '100'}) }, timeStep * 4);
            setTimeout(() => { updateColor({ newCode: '110'}) }, timeStep * 5);
            setTimeout(() => { updateColor({ newCode: '111'}) }, timeStep * 6);
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
          const timeStep = 1000;
          setTimeout(() => { updateColor({ newCode: '011'}) }, timeStep);
          setTimeout(() => { updateColor({ newCode: '001'}) }, timeStep * 2);
          setTimeout(() => { updateColor({ newCode: '101'}) }, timeStep * 3);
          setTimeout(() => { updateColor({ newCode: '100'}) }, timeStep * 4);
          setTimeout(() => { updateColor({ newCode: '110'}) }, timeStep * 5);
          setTimeout(() => { updateColor({ newCode: '111'}) }, timeStep * 6);
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
            const timeStep = 600;
            const codesToShow = [
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
            codesToShow.forEach((code, index) => {
              setTimeout(() => { updateColor({newCode: code}) }, (index + 1) * timeStep);
            });
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
            const timeStep = 600;
            const codesToShow = [
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
            codesToShow.forEach((code, index) => {
              setTimeout(() => { updateColor({newCode: code}) }, (index + 1) * timeStep);
            });
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
            const timeStep = 300;
            const codesToShow = [
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
            codesToShow.forEach((code, index) => {
              setTimeout(() => { updateColor({newCode: code}) }, (index + 1) * timeStep);
            });
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
