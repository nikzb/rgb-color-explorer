import ColorCircle from '../ColorCircle/ColorCircle';
import ColorCode from '../ColorCode/ColorCode';

const RT_3_OVER_2 = Math.sqrt(3) / 2;
const ONE_HALF = 0.5;
// A measure of how much the circles will overlap, bigger is more overlap
const MAX_CIRCLE_DIST_MULT = 0.25;

class ColorCircleGroup {
  // The constructor takes a ColorCode and a canvas context.
  // It creates an array of three circles make up of the three color components
  constructor({colorCode, context, x, y, radius, percentFromCenter}) {
    this.circles = [];
    this.percentFromCenter = percentFromCenter;

    console.log(this.percentFromCenter);
    if (Math.abs(this.percentFromCenter) < 0.01) {
      this.circles.push(new ColorCircle({
        x: 0,
        y: 0,
        radius: radius,
        colorCode: new ColorCode({
          base: colorCode.getBase(),
          bits: colorCode.getBits(),
          red: colorCode.getComponent('R'),
          green: colorCode.getComponent('G'),
          blue: colorCode.getComponent('B')
        }),
        context
      }));
    }
    else {
      // Add red circle in bottom left position
      this.circles.push(new ColorCircle({
        x: x - radius * MAX_CIRCLE_DIST_MULT * this.percentFromCenter * RT_3_OVER_2,
        y: y - radius * MAX_CIRCLE_DIST_MULT * this.percentFromCenter * ONE_HALF,
        radius: radius,
        colorCode: new ColorCode({
          base: colorCode.getBase(),
          bits: colorCode.getBits(),
          red: colorCode.getComponent('R'),
          green: 0,
          blue: 0,
        }),
        context
      }));
      // Add green circle in top position
      this.circles.push(new ColorCircle({
        x: x,
        y: y + radius * MAX_CIRCLE_DIST_MULT * this.percentFromCenter,
        radius: radius,
        colorCode: new ColorCode({
          base: colorCode.getBase(),
          bits: colorCode.getBits(),
          red: 0,
          green: colorCode.getComponent('G'),
          blue: 0,
        }),
        context
      }));
      // Add blue circle in bottom right position
      this.circles.push(new ColorCircle({
        x: x + radius * MAX_CIRCLE_DIST_MULT * this.percentFromCenter * RT_3_OVER_2,
        y: y - radius * MAX_CIRCLE_DIST_MULT * this.percentFromCenter * ONE_HALF,
        radius: radius,
        colorCode: new ColorCode({
          base: colorCode.getBase(),
          bits: colorCode.getBits(),
          red: 0,
          green: 0,
          blue: colorCode.getComponent('B'),
        }),
        context
      }));
    }
  }

  draw() {
    this.circles.forEach(circle => circle.draw());
  }
}

export default ColorCircleGroup;
