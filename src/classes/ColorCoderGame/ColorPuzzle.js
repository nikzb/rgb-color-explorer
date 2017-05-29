class ColorPuzzle {
  constructor(color) {
    this.actualColor = color;
    this.guesses = [];
  }

  checkGuess(guess) {
    // newest guess goes at the end
    this.guesses.push(guess);
    return this.actualColor.equals(guess);
  }

  getMostRecentGuess() {
    if (this.guesses.length === 0) {
      return null;
    }
    // return the last item in the guesses list
    return this.guesses[this.guesses.length - 1];

  }

  getComponentDiffsForMostRecentGuess() {
    if (this.guesses.length === 0) {
      return null;
    }
    return {
      red: this.getMostRecentGuess().getComponent('R') - this.actualColor.getComponent('R'),
      green: this.getMostRecentGuess().getComponent('G') - this.actualColor.getComponent('G'),
      blue: this.getMostRecentGuess().getComponent('B') - this.actualColor.getComponent('B')
    };
  }

  getNumberOfGuesses() {
    return this.guesses.length;
  }

  getActualColor() {
    return this.actualColor;
  }

  getScore() {
    // Start with 100 points. Reduce score based on each guess, pass new score along
    return this.guesses.reduce((points, guess) => {
      let pointsLost = 0;
      if (guess.getComponent('R') !== this.actualColor.getComponent('R')) {
        pointsLost += 1;
      }
      if (guess.getComponent('G') !== this.actualColor.getComponent('G')) {
        pointsLost += 1;
      }
      if (guess.getComponent('B') !== this.actualColor.getComponent('B')) {
        pointsLost += 1;
      }
      // Score should never go below 1
      return Math.max(points - pointsLost, 1);
    }, 100);
  }
}

export default ColorPuzzle;
