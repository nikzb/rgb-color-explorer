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
    } else {
      // return the last item in the guesses list
      return this.guesses[this.guesses.length - 1];
    }
  }

  getComponentDiffsForMostRecentGuess() {
    return {
      red: this.getMostRecentGuess().getComponent('R') - this.actualColor.getComponent('R'),
      green: this.getMostRecentGuess().getComponent('G') - this.actualColor.getComponent('G'),
      blue: this.getMostRecentGuess().getComponent('B') - this.actualColor.getComponent('B')
    };
  }

  getNumberOfGuesses() {
    return this.guesses.length;
  }
}

export default ColorPuzzle;
