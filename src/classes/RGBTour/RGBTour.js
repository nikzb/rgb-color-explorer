import Shepherd from 'tether-shepherd';

import './ShepherdStyles/shepherd-theme-arrows.css';
import './ShepherdStyles/shepherd-theme-default.css';
import './ShepherdStyles/shepherd-theme-dark.css';


class RGBTour {
  constructor() {
    this.tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-dark',
        scrollTo: true,
      },
    });
    this.addTourSteps();
  }

  getTour() {
    return this.tour;
  }

  addTourSteps() {
    const standardButtons = [
      {
        text: 'Back',
        action: this.tour.prev
      },
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
      buttons: standardButtons
    })
    .addStep('dimmer', {
      text: 'The red, green, and blue light intensities can be adjusted individually',
      attachTo: '.ColorControlPanel__container top',
      buttons: standardButtons
    })
    .addStep('binary', {
      text: 'Binary codes can be used to represent the various combinations of red, green, and blue light intensities',
      attachTo: '.ColorCodeControl__container bottom',
      buttons: standardButtons
    })
    .addStep('moreBits', {
      text: 'Using more bits to create the code allows us to create a larger number of colors',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons
    })
    .addStep('hex', {
      text: 'When the binary codes start to get long, it is more convenient to use hexadecimal codes instead.',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons
    })
    .addStep('hex24', {
      text: 'With 24 bits, you can really fine tune your color shades!',
      attachTo: '.ColorCodeControl__container top',
      buttons: standardButtons
    })
    .addStep('explore', {
      text: 'Now it is your turn to explore. See what colors you can make!',
      buttons: [
        {
          text: 'Replay the Tour',
          action: this.tour.start
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
