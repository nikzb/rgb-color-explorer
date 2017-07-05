// PrecisionGame.js

// The state of the game will be stored in an immutable Map from Immutable.js
// The contents are of this object are:
//   -The current round #
//   -A (immutable) List of puzzles

import { Map, List } from 'immutable';

import { newPuzzle, getPuzzleScore, addGuess } from './PrecisionPuzzle';

export const newGame = (difficulty) => {
  let puzzles = List();

  puzzles = puzzles.push(newPuzzle(difficulty));
  puzzles = puzzles.push(newPuzzle(difficulty));
  puzzles = puzzles.push(newPuzzle(difficulty));

  return Map({
    round: 1,
    puzzles
  });
}

export const currentPuzzle = (game) => {
  const round = game.get('round');

  return game.get('puzzles').get(round);
}

export const getGameScore = (game) => {
  return game.get('puzzles').reduce((total, puzzle) => {
    return total + getPuzzleScore(puzzle);
  }, 0)
}

export const goToNextRound = (game) => {
  return game.set('round', game.get('round') + 1);
}

export const makeGuess = (game, guess) => {
  const puzzle = addGuess(game.get('puzzles').get('round'), guess);

  const puzzles = game.get('puzzles').set(game.get('round'), puzzle);

  return game.set('puzzles', puzzles);
}
