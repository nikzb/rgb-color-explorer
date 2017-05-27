import ColorCode from '../ColorCode/ColorCode';
import ColorPuzzle from './ColorPuzzle';

class ColorCoderGame {
  constructor({level, performAnimationWhenPuzzleSolved, forceUpdate}) {
    this.level = level;
    this.colorPuzzles = [];
    this.currentPuzzleIndex = 0;

    // A promise that performs the animation, then resolves
    this.performAnimationWhenPuzzleSolved = performAnimationWhenPuzzleSolved;
    this.populateColorPuzzles();
    this.forceUpdate = forceUpdate;
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
    if (this.currentPuzzleIndex >= 3) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex];
  }

  getCurrentColorToGuess() {
    if (this.currentPuzzleIndex >= 3) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex].getActualColor();
  }

  isGameOver() {
    return this.currentPuzzleIndex >= 3;
  }

  incrementPuzzleIndex() {
    this.currentPuzzleIndex += 1;
    // Needed to add force update for React component this game belongs to because it stopped updating
    // when I added the animation when a puzzle is solved
    this.forceUpdate();
  }

  processGuess(guess) {
    const isGuessCorrect = this.getCurrentPuzzle().checkGuess(guess);
    if (isGuessCorrect) {
      // call the function that performs the animation before transitioning to the next puzzle
      this.performAnimationWhenPuzzleSolved().then(this.incrementPuzzleIndex.bind(this));
    }
  }

  getBestScore() {
    return this.colorPuzzles.reduce((min, puzzle) => {
      return Math.min(min, puzzle.getNumberOfGuesses());
    }, this.colorPuzzles[0].getNumberOfGuesses());
  }

  getLevel() {
    return this.level;
  }
}

export default ColorCoderGame;
