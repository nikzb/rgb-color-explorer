// import ColorCode from '../ColorCode/ColorCode';

// Color code should be of the type imported above
class ColorCircle {
  constructor({x, y, radius, colorCode, alpha=1, context}) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colorCode = colorCode;
    this.alpha = alpha;
    this.context = context;
  }


  // Draw this circle in its canvas context
  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.getRGBString();

    this.context.fill();

    // If the circle is white, add a black border
    if (this.colorCode.getHexCode() === '#FFFFFF') {
      this.context.strokeStyle = 'rgb(0,0,0)';
      this.context.stroke();
    }

  };

  // Return the RGB String of the color of this circle
  getRGBString() {
    return this.colorCode.getRGB256String();
  }
}

export default ColorCircle;
