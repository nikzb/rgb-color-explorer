import ColorCircle from '../ColorCircle/ColorCircle';
import ColorCode from '../ColorCode/ColorCode';

const RT_3_OVER_2 = Math.sqrt(3) / 2;
const ONE_HALF = 0.5;
// A measure of how much the circles will overlap, bigger is more overlap
const CIRCLE_TIGHTNESS = 4;

class ColorCircleGroup {
  // The constructor takes a ColorCode and a canvas context.
  // It creates an array of three circles make up of the three color components
  constructor({colorCode, context, x, y, radius}) {
    this.circles = [];
    // Add red circle in bottom left position
    this.circles.push(new ColorCircle({
      x: x - radius * RT_3_OVER_2 / CIRCLE_TIGHTNESS,
      y: y - radius * ONE_HALF / CIRCLE_TIGHTNESS,
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
      y: y + radius / CIRCLE_TIGHTNESS,
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
      x: x + radius * RT_3_OVER_2 / CIRCLE_TIGHTNESS,
      y: y - radius * ONE_HALF / CIRCLE_TIGHTNESS,
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

  draw() {
    this.circles.forEach(circle => circle.draw());
  }
}

export default ColorCircleGroup;
