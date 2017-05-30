import ColorCode from '../ColorCode/ColorCode';
import ColorPuzzle from './ColorPuzzle';

class ColorCoderGame {
  constructor({level, isDemo, performAnimationWhenPuzzleSolved, forceUpdate}) {
    this.level = level;
    this.colorPuzzles = [];
    this.currentPuzzleIndex = 0;

    // A promise that performs the animation, then resolves
    this.performAnimationWhenPuzzleSolved = performAnimationWhenPuzzleSolved;

    if (isDemo) {
      this.setUpDemo();
    } else {
      this.populateColorPuzzles();
    }
    this.forceUpdate = forceUpdate;
  }

  setUpDemo() {
    const color1 = new ColorCode({
      bits: 6,
      base: 2,
      code: '110110'
    });
    this.colorPuzzles.push(new ColorPuzzle(color1));

    const color2 = new ColorCode({
      bits: 12,
      base: 16,
      code: 'A4E'
    })
    this.colorPuzzles.push(new ColorPuzzle(color2));
  }

  setLevel(newLevel) {
    this.level = newLevel;
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

    // Generate random colors for this game. The second and third colors try to avoid being too similar to the first and second
    // Note that this code is not generalized for a number of puzzles other than 3.
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

  getPuzzlesPerGame() {
    return 3;
  }

  getCurrentPuzzle() {
    if (this.currentPuzzleIndex >= this.getPuzzlesPerGame()) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex];
  }

  getCurrentColorToGuess() {
    console.log(this.currentPuzzleIndex);
    console.log(this.getPuzzlesPerGame());
    if (this.currentPuzzleIndex >= this.getPuzzlesPerGame()) {
      throw Error('Puzzle Index is too big. Puzzles have been used up');
    }
    return this.colorPuzzles[this.currentPuzzleIndex].getActualColor();
  }

  isGameOver() {
    return this.currentPuzzleIndex >= this.getPuzzlesPerGame();
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
    this.forceUpdate();
  }

  // Returns the lowest number of guesses in a single puzzle
  getLowestNumberOfGuesses() {
    return this.colorPuzzles.reduce((min, puzzle) => {
      return Math.min(min, puzzle.getNumberOfGuesses());
    }, this.colorPuzzles[0].getNumberOfGuesses());
  }

  // Returns the current score based on the rounds that have been completed
  getScore() {
    let totalScore = 0;

    for (let i = 0; i < this.currentPuzzleIndex; i += 1) {
      totalScore += this.colorPuzzles[i].getScore();
    }

    return totalScore;
  }

  getMaxPossibleScore() {
    // This assumes 100 points per puzzle
    return this.getPuzzlesPerGame() * 100;
  }

  getLevel() {
    return this.level;
  }
}

export default ColorCoderGame;
