import _ from 'lodash';

class ColorCode {
  constructor({bits=24, base=16, red=0, green=0, blue=0, random=false, code}) {
    const correctCompValue = (compValue) => {
      const maxCompValue = this.getMaxComponentValue();
      if (compValue < 0) {
        return 0;
      } else if (compValue > maxCompValue) {
        return maxCompValue;
      } else {
        return compValue;
      }
    }

    const validNumbersOfBits = [3, 6, 12, 24];
    if (!_.includes(validNumbersOfBits, bits)) {
      throw Error('Invalid number of bits used to create ColorCode');
    }

    // If random code requested, must have provided base and bits
    if (random) {
      if (!base || !bits) {
        throw Error('Need base and bits to create random code');
      }
      this.base = base;
      this.bits = bits;
      this.red = this.getRandomComponent();
      this.green = this.getRandomComponent();
      this.blue = this.getRandomComponent();
    } else if (code || code === '') {
      let fullCodeLength;
      if (base === 2) {
        this.base = 2;
        this.bits = bits;
        fullCodeLength = bits;
      }
      else if (base === 16) {
        this.base = 16;
        this.bits = bits;
        fullCodeLength = bits / 4;
      }

      let codeToUse;

      if (code.length < fullCodeLength) {
        this.isPartial = true;
        this.partial = code;
        codeToUse = code.slice(0, code.length);
        while (codeToUse.length < fullCodeLength) {
          codeToUse += '0';
        }
      }
      else {
        this.isPartial = false;
        codeToUse = code;
      }
      this.red = parseInt(codeToUse.substring(0, fullCodeLength / 3), base);
      this.green = parseInt(codeToUse.substring(fullCodeLength / 3, 2 * fullCodeLength / 3), base);
      this.blue = parseInt(codeToUse.substring(2 * fullCodeLength / 3), base);
    }
    else {
      this.bits = bits;
      this.base = base;
      this.red = correctCompValue(red);
      this.green = correctCompValue(green);
      this.blue = correctCompValue(blue);
    }
  }

  // Get the requested component ("R", "G", or "B") of this color as a number
  getComponent(comp) {
    if (comp === "R") {
      return this.red;
    } else if (comp === "G") {
      return this.green;
    } else if (comp === "B") {
      return this.blue;
    }
  }

  // Get the requested component ("R", "G", or "B") of this color as a string
  getComponentAsString(comp) {
    if (this.base === 16) {
      let hexString = this.getComponent(comp).toString(16).toUpperCase();
      while (hexString.length < this.getBitsPerComponent() / 4) {
        hexString = "0" + hexString;
      }
      return hexString;
    } else if (this.base === 2) {
      // console.log(`value${this.getComponent(comp)}`);
      let binaryString = this.getComponent(comp).toString(2);
      // console.log(binaryString);
      while (binaryString.length < this.getBitsPerComponent()) {
        binaryString = "0" + binaryString;
      }
      // console.log(comp);
      // console.log(binaryString);
      return binaryString;
    }
  }

  // Get the requested component ("R", "G", or "B") as a 0-255 value
  getComponent256(comp) {
    const compValue = this.getComponent(comp);
    const maxValue = this.getMaxComponentValue();

    return Math.round(compValue * 255 / maxValue);
  }

  convertFrom256ToBaseBitValue(value) {
    const maxValue = this.getMaxComponentValue();

    return Math.round(value * maxValue / 255);
  }

  // Return the full color code (all three parts combined) as a String
  getCode() {
    return "" + this.getComponentAsString("R") + this.getComponentAsString("G") + this.getComponentAsString("B");
  }

  // Get the partial color code (whatever is stored in partial) as a String
  getPartial() {
    return this.partial;
  }

  getFullCodeLength() {
    if (this.base === 2) {
      return this.bits;
    } else {
      return this.bits / 4;
    }
  }

  // Get a String with the 0-255 components in the format "rgb(r, g, b)"
  getRGB256String() {
    return "rgb(" + this.getComponent256("R") + "," + this.getComponent256("G") + "," + this.getComponent256("B") + ")";
  }

  // Get a String with the hex code in the format "#RRGGBB"
  getHexCode() {
    return "#" + this.convertComponentToHex("R") +
    	   this.convertComponentToHex("G") +
    	   this.convertComponentToHex("B");
  }

  // Return the requested component ("R", "G", or "B") as a two symbol hex code
  convertComponentToHex(comp) {
    const comp256 = this.getComponent256(comp);
    let hex = comp256.toString(16).toUpperCase();
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    return hex;
  }

  // Get a Color object whose color is the inverted from this color
  getInvertedColor() {
    const maxValue = this.getMaxComponentValue();
    return new ColorCode({
      bits: this.bits,
      base: this.base,
      red: maxValue - this.getComponent("R"),
      green: maxValue - this.getComponent("G"),
      blue: maxValue - this.getComponent("B")
    });
  }

  // Generate and return a random color component value
  getRandomComponent() {
    return Math.floor(Math.random() * Math.pow(2, this.getBitsPerComponent()));
  }

  // Return the number of bits per color component
  getBitsPerComponent() {
    if (this.bits % 3 === 0) {
      return this.bits / 3;
    }
  }

  // Return the base
  getBase() {
    return this.base;
  }

  // Return the number of bits for the whole code
  getBits() {
    return this.bits;
  }

  // Get the maximum component value allowed given the number of bits
  getMaxComponentValue() {
    return Math.pow(2, this.getBitsPerComponent()) - 1;
  }

  /* Return true if this color has the same RGB values as otherColor.
   * Otherwise return false
   * Pre-condition: otherColor is a ColorCode object
   */
  equals(otherColor) {
    return (this.getComponent256("R") === otherColor.getComponent256("R") &&
            this.getComponent256("G") === otherColor.getComponent256("G") &&
            this.getComponent256("B") === otherColor.getComponent256("B"));
  }

  closeTo(otherColor) {
    const sumOfDiffs = Math.abs(this.getComponent256("R") - otherColor.getComponent256("R")) +
                       Math.abs(this.getComponent256("G") - otherColor.getComponent256("G")) +
                       Math.abs(this.getComponent256("B") - otherColor.getComponent256("B"));

    return sumOfDiffs < 50;
  }
}

export default ColorCode;
