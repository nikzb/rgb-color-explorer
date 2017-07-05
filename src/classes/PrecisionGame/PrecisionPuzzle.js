// PrecisionPuzzle.js

// The state of a puzzle will be stored in an immutable Map (from Immutable.js)
// The contents of ths object are:
//  -answer: The answer to the puzzle as a String containing 1s and 0s
//  -numberValue: The number value that must correctly be approximated to solve the puzzle
//  -guesses: A list of the guesses made on this puzzle. No additional guesses allowed if solved is true
//  -solved: A boolean. True iff most recent guess matches the answer.

import { Map, List } from 'immutable';

// Takes a puzzle and returns the score earned
export const getPuzzleScore = puzzle => {
  let ones = 0;
  const answer = puzzle.get('answer');
  for (let index = 0; index < answer.length; index += 1) {
    if (answer.slice(index, index + 1) === '1') {
      ones += 1;
    }
  }

  return puzzle.get('flips') - ones;
}

const bestPossibleAnswer = (difficulty, numberValue) => {
  let smallestPower;
  if (difficulty === 'beginner') {
    smallestPower = 1 / 64;
  } else if (difficulty === 'expert') {
    smallestPower = 1/ 256;
  } else {
    throw new Error('Invalid difficulty level specified when determining best possible answer');
  }

  let power = 0.5;
  let amountLeft = numberValue;
  let bitString = '';

  while (power >= smallestPower) {
    if (amountLeft > power - smallestPower / 2) {
      bitString += '1';
      amountLeft -= power;
    } else {
      bitString += '0';
    }
    power /= 2;
  }

  return bitString;
}

// Takes a difficulty level and return a randomized puzzle
export const newPuzzle = difficulty => {
  if (difficulty === 'beginner') {
    const numberValue = Math.floor(Math.random() * 97 + 2) / 100;
    const answer = bestPossibleAnswer(difficulty, numberValue);
    return Map({
      numberValue,
      answer,
      guesses: List(),
      solved: false
    });
  } else if (difficulty === 'expert') {
    const numberValue = Math.floor(Math.random() * 993 + 4) / 1000;
    const answer = bestPossibleAnswer(difficulty, numberValue);
    return Map({
      numberValue,
      answer,
      guesses: List(),
      solved: false
    });
  } else {
    throw new Error('Invalid difficulty level specified when creating new puzzle');
  }
}

// Take a puzzle and a guess and return a new puzzle with that guess included as the most recent guess
export const addGuess = (puzzle, guess) => {
  if (puzzle.get('solved')) {
    return puzzle;
  }
  let updatedPuzzle = puzzle.set('guesses', puzzle.get('guesses').push(guess));

  if (guess === puzzle.get('answer')) {
    updatedPuzzle = puzzle.set('solved', true);
  }

  return updatedPuzzle;
}
