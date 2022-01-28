const fs = require('fs');
const path = require('path');

// TODO: use typescript

class WordleSolver {
  // using an array hasn't been too slow so far, but may need to do something else eventually
  possibleWords;

  constructor() {
    this.possibleWords = loadWordFile();
  }

  // show all the words that are still possible
  showWords() {
    console.log(this.possibleWords.join(','));
  }

  // when a letter is part of the word, at a specific position
  letterIncludedAtPosition(letter, position) {
    this.possibleWords = this.possibleWords.filter((word) => word[position] === letter);
    console.log(`There are ${this.possibleWords.length} words left now`);
  }

  // when a letter is part of the word, but not at a specific position
  letterIncludedNotAtPosition(letter, position) {
    this.possibleWords = this.possibleWords.filter((word) => word.includes(letter) && word[position] !== letter);
    console.log(`There are ${this.possibleWords.length} words left now`);
  }

  // when a letter is not part of the word
  letterNotIncluded(letter) {
    this.possibleWords = this.possibleWords.filter((word) => !word.includes(letter));
    console.log(`There are ${this.possibleWords.length} words left now`);
  }

  // TODO: how to show what guess is best?
  showBestGuess() {
    console.log('TODO: not yet implemented');
  }
}

// load the word file
function loadWordFile() {
  const allWords = fs.readFileSync(path.resolve(__dirname, 'five-letter-words.txt'), 'utf8').split('\n');
  return allWords;
}


// solve today's wordle
const wordleSolver = new WordleSolver();

wordleSolver.letterNotIncluded('f');
wordleSolver.letterNotIncluded('l');
wordleSolver.letterNotIncluded('u');
wordleSolver.letterNotIncluded('t');
wordleSolver.letterIncludedNotAtPosition('e', 4);

wordleSolver.letterNotIncluded('a');
wordleSolver.letterNotIncluded('v');
wordleSolver.letterNotIncluded('o');
wordleSolver.letterNotIncluded('i');
wordleSolver.letterNotIncluded('d');

wordleSolver.letterNotIncluded('j');
wordleSolver.letterIncludedAtPosition('e', 1);
wordleSolver.letterIncludedAtPosition('r', 2);
wordleSolver.letterIncludedAtPosition('k', 3);
wordleSolver.letterIncludedAtPosition('y', 4);

wordleSolver.showWords();
