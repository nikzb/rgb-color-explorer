import ColorCode from '../ColorCode/ColorCode';
import ColorPuzzle from './ColorPuzzle';

describe('ColorPuzzle', () => {
  describe('6 Bit', () => {

    it('should create a puzzle with blue green as the actual color', () => {
      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const puzzle = new ColorPuzzle(blueGreen);

      expect(puzzle.actualColor.equals(blueGreen)).toBe(true);
    });

    it('should return null for most recent guess when no guesses have been made', () => {
      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const puzzle = new ColorPuzzle(blueGreen);

      expect(puzzle.getMostRecentGuess()).toBe(null);
    });

    it('should return the most recent guess correctly', () => {
      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const puzzle = new ColorPuzzle(blueGreen);

      const guess = new ColorCode({
        bits: 6,
        base: 2,
        green: 1,
        blue: 2,
        red: 3
      });

      puzzle.checkGuess(guess);

      expect(puzzle.getMostRecentGuess()).toBe(guess);
    });

    it('should return the correct length of the guess list', () => {

      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const puzzle = new ColorPuzzle(blueGreen);

      const guess = new ColorCode({
        bits: 6,
        base: 2,
        green: 1,
        blue: 2,
        red: 3
      });

      puzzle.checkGuess(guess);

      const guess2 = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 0,
        red: 2
      });

      puzzle.checkGuess(guess2);

      expect(puzzle.getNumberOfGuesses()).toBe(2);
    });

    it('should return the correct component diffs for the most recent guess', () => {
      const blueGreen = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 2
      });

      const puzzle = new ColorPuzzle(blueGreen);

      const guess = new ColorCode({
        bits: 6,
        base: 2,
        green: 1,
        blue: 2,
        red: 3
      });

      puzzle.checkGuess(guess);

      const guess2 = new ColorCode({
        bits: 6,
        base: 2,
        green: 3,
        blue: 0,
        red: 2
      });

      puzzle.checkGuess(guess2);

      const diffs = puzzle.getComponentDiffsForMostRecentGuess();
      expect(diffs.red).toBe(2);
      expect(diffs.green).toBe(0);
      expect(diffs.blue).toBe(-2);
    });
  });
})
