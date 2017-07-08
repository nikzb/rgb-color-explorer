// PrecisionPuzzle.js

// The state of a puzzle will be stored in an immutable Map (from Immutable.js)
// The contents of ths object are:
//  -answer: The answer to the puzzle as an immutable list containing 1s and 0s
//  -numberValue: The number value that must correctly be approximated to solve the puzzle
//  -guesses: A list of the guesses made on this puzzle. No additional guesses allowed if solved is true
//  -solved: A boolean. True iff most recent guess matches the answer.

import { Map, List } from 'immutable';

export const getPuzzleValue = puzzle => {
  console.log(puzzle);
  return puzzle.get('numberValue');
}

// Takes a puzzle and returns the score earned
export const getPuzzleScore = puzzle => {
  let ones = 0;
  const answer = puzzle.get('answer');
  for (let index = 0; index < answer.length; index += 1) {
    if (answer.get('index') === 1) {
      ones += 1;
    }
  }

  return puzzle.get('flips') - ones;
}

// Return the best possible answer for the given number value as an immutable list of 1s and 0s
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
  let bitArray = [];

  while (power >= smallestPower) {
    if (amountLeft > power - smallestPower / 2) {
      bitArray.push(1)
      amountLeft -= power;
    } else {
      bitArray.push(0);
    }
    power /= 2;
  }

  return List(bitArray);
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

// Take a puzzle, a guess (immut list of 1s and 0s), and a boolean specifying whether are the panels are stable (not flipping) and return a new puzzle with that guess included as the most recent guess
export const addGuess = (puzzle, guess, stable) => {
  if (puzzle.get('solved')) {
    return puzzle;
  }

  let updatedPuzzle = puzzle.set('guesses', puzzle.get('guesses').push(guess));
  let listsMatch = true;
  const answer = puzzle.get('answer');

  if (guess.size !== answer.size) {
    listsMatch = false;
  } else {
    for (let index = 0; index < answer.size; index += 1) {
      if (guess.get(index) !== answer.get(index)) {
        listsMatch = false;
        break;
      }
    }
  }

  if (listsMatch && stable) {
    updatedPuzzle = updatedPuzzle.set('solved', true);
  }

  return updatedPuzzle;
}
