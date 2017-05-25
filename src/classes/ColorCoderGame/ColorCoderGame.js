import ColorCode from '../ColorCode/ColorCode';
import ColorPuzzle from './ColorPuzzle';

class ColorCoderGame {
  constructor({level}) {
    this.level = level;
    this.colorPuzzles = [];
    this.currentPuzzleIndex = 0;
    this.populateColorPuzzles();
  }

  populateColorPuzzles() {
    let bits;
    let base;
    if (this.level === 1) {
      bits = 6;
      base = 2;
    } else {
      base = 16;
      if (this.level === 2) {
        bits = 12;
      } else {
        bits = 24;
      }
    }
    let color1 = new ColorCode({bits, base, random: true});
    this.colorPuzzles.push(new ColorPuzzle(color1));

    let color2 = new ColorCode({bits, base, random: true});

    while (color1.closeTo(color2)) {
      color2 = new ColorCode({bits, base, random: true});
    }
    this.colorPuzzles.push(new ColorPuzzle(color2));

    let color3 = new ColorCode({bits, base, random: true});

    while (color1.closeTo(color3)) {
      color3 = new ColorCode({bits, base, random: true});
    }
    while (color2.closeTo(color3)) {
      color3 = new ColorCode({bits, base, random: true});
    }
    this.colorPuzzles.push(new ColorPuzzle(color3));
  }

  getCurrentPuzzle() {
    if (this.currentPuzzleIndex > 3) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex];
  }

  getCurrentColorToGuess() {
    if (this.currentPuzzleIndex > 3) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex].getActualColor();
  }

  processGuess(guess) {
    const isGuessCorrect = this.getCurrentPuzzle().checkGuess(guess);
    if (isGuessCorrect) {
      this.currentPuzzleIndex += 1;
    }
  }
}

export default ColorCoderGame;
