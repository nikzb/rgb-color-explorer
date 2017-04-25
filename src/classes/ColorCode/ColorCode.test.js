import ColorCode from './ColorCode';

describe('ColorCode', () => {
  describe('Binary Colors', () => {
    describe('6 Bit', () => {
      const green = new ColorCode({
        bits: 3,
        base: 2,
        green: 1
      });

      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const inversionOfBlueGreen = new ColorCode({
        bits: 6,
        base: 2,
        red: 3,
        blue: 1
      });

      it('should create a 3 bit binary color', () => {
        expect(green.getCode()).toBe('010');
      });

      it('should get one component value as a number', () => {
        expect(blueGreen.getComponent('R')).toBe(0);
        expect(blueGreen.getComponent('G')).toBe(3);
        expect(blueGreen.getComponent('B')).toBe(2);
      });

      it('should get one component value as a string', () => {
        expect(blueGreen.getComponentAsString('R')).toBe('00');
        expect(blueGreen.getComponentAsString('G')).toBe('11');
        expect(blueGreen.getComponentAsString('B')).toBe('10');
      });

      it('should get one component value as a number from 0-255', () => {
        expect(blueGreen.getComponent256('R')).toBe(0);
        expect(blueGreen.getComponent256('G')).toBe(255);
        expect(blueGreen.getComponent256('B')).toBe(170);
      });

      it('should get the correct RGB 0-255 string for use in css', () => {
        expect(blueGreen.getRGB256String()).toBe('rgb(0,255,170)');
      });

      it('should get the correct hex code', () => {
        expect(blueGreen.getHexCode()).toBe('#00FFAA');
      });

      it('should get a ColorCode for the inverted color', () => {
        expect(blueGreen.getInvertedColor()).toEqual(inversionOfBlueGreen);
      });

      it('should get the correct number of bits per component', () => {
        expect(blueGreen.getBitsPerComponent()).toBe(2);
      });

      it('should correctly determine if two colors are equal', () => {
        const green9Bit = new ColorCode({
          base: 2,
          bits: 9,
          green: 7
        });
        expect(green.equals(inversionOfBlueGreen)).toBe(false);
        expect(green.equals(green9Bit)).toBe(true);
      });
    });
  });

  describe('Hexadecimal Colors', () => {
    describe('12 Bit', () => {
      const green = new ColorCode({
        bits: 12,
        base: 16,
        green: 15
      });

      const blueGreen = new ColorCode({
        bits: 12,
        base: 16,
        green: 15,
        blue: 10
      });

      const inversionOfBlueGreen = new ColorCode({
        bits: 12,
        base: 16,
        red: 15,
        blue: 5
      });

      it('should create a 12 bit hex color', () => {
        expect(green.getCode()).toBe('0F0');
      });

      it('should get one component value as a number', () => {
        expect(blueGreen.getComponent('R')).toBe(0);
        expect(blueGreen.getComponent('G')).toBe(15);
        expect(blueGreen.getComponent('B')).toBe(10);
      });

      it('should get one component value as a string', () => {
        expect(blueGreen.getComponentAsString('R')).toBe('0');
        expect(blueGreen.getComponentAsString('G')).toBe('F');
        expect(blueGreen.getComponentAsString('B')).toBe('A');
      });

      it('should get one component value as a number from 0-255', () => {
        expect(blueGreen.getComponent256('R')).toBe(0);
        expect(blueGreen.getComponent256('G')).toBe(255);
        expect(blueGreen.getComponent256('B')).toBe(170);
      });

      it('should get the correct RGB 0-255 string for use in css', () => {
        expect(blueGreen.getRGB256String()).toBe('rgb(0,255,170)');
      });

      it('should get the correct hex code', () => {
        expect(blueGreen.getHexCode()).toBe('#00FFAA');
      });

      it('should get a ColorCode for the inverted color', () => {
        expect(blueGreen.getInvertedColor()).toEqual(inversionOfBlueGreen);
      });

      it('should get the correct number of bits per component', () => {
        expect(blueGreen.getBitsPerComponent()).toBe(4);
      });

      it('should correctly determine if two colors are equal', () => {
        const green9Bit = new ColorCode({
          base: 2,
          bits: 9,
          green: 7
        });
        expect(green.equals(inversionOfBlueGreen)).toBe(false);
        expect(green.equals(green9Bit)).toBe(true);
      });
    });

    describe('24 Bit', () => {
      const green = new ColorCode({
        bits: 24,
        base: 16,
        green: 255
      });

      const blueGreen = new ColorCode({
        bits: 24,
        base: 16,
        green: 255,
        blue: 170
      });

      const inversionOfBlueGreen = new ColorCode({
        bits: 24,
        base: 16,
        red: 255,
        blue: 85
      });

      console.log(blueGreen.getComponent('B'));

      it('should create a 24 bit hex color', () => {
        expect(green.getCode()).toBe('00FF00');
      });

      it('should get one component value as a number', () => {
        expect(blueGreen.getComponent('R')).toBe(0);
        expect(blueGreen.getComponent('G')).toBe(255);
        expect(blueGreen.getComponent('B')).toBe(170);
      });

      it('should get one component value as a string', () => {
        expect(blueGreen.getComponentAsString('R')).toBe('00');
        expect(blueGreen.getComponentAsString('G')).toBe('FF');
        expect(blueGreen.getComponentAsString('B')).toBe('AA');
      });

      it('should get one component value as a number from 0-255', () => {
        expect(blueGreen.getComponent256('R')).toBe(0);
        expect(blueGreen.getComponent256('G')).toBe(255);
        expect(blueGreen.getComponent256('B')).toBe(170);
      });

      it('should get the correct RGB 0-255 string for use in css', () => {
        expect(blueGreen.getRGB256String()).toBe('rgb(0,255,170)');
      });

      it('should get the correct hex code', () => {
        expect(blueGreen.getHexCode()).toBe('#00FFAA');
      });

      it('should get a ColorCode for the inverted color', () => {
        expect(blueGreen.getInvertedColor()).toEqual(inversionOfBlueGreen);
      });

      it('should get the correct number of bits per component', () => {
        expect(blueGreen.getBitsPerComponent()).toBe(8);
      });

      it('should correctly determine if two colors are equal', () => {
        const green9Bit = new ColorCode({
          base: 2,
          bits: 9,
          green: 7
        });
        expect(green.equals(inversionOfBlueGreen)).toBe(false);
        expect(green.equals(green9Bit)).toBe(true);
      });
    });
  });
});
