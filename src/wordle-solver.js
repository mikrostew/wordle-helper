const fs = require('fs');
const path = require('path');

// TODO: use typescript

class WordleSolver {
  // using an array hasn't been too slow so far, but may need to do something else eventually
  possibleWordsAndFreqs;

  constructor() {
    this.possibleWordsAndFreqs = loadWordAndFreqFile();
  }

  // show all the words that are still possible
  showWords() {
    console.log(this.possibleWordsAndFreqs.map((waf) => waf.word).join(','));
  }

  // when a letter is part of the word, at a specific position
  letterIncludedAtPosition(letter, position) {
    this.possibleWordsAndFreqs = this.possibleWordsAndFreqs.filter((waf) => waf.word[position] === letter);
  }

  // when a letter is part of the word, but not at a specific position
  letterIncludedNotAtPosition(letter, position) {
    this.possibleWordsAndFreqs = this.possibleWordsAndFreqs.filter((waf) => waf.word.includes(letter) && waf.word[position] !== letter);
  }

  // when a letter is not part of the word
  letterNotIncluded(letter) {
    this.possibleWordsAndFreqs = this.possibleWordsAndFreqs.filter((waf) => !waf.word.includes(letter));
  }

  // because I use this in a bunch of places
  howManyWordsLeft() {
    console.log(`There are ${this.possibleWordsAndFreqs.length} words left now`);
    return this.possibleWordsAndFreqs.length;
  }

  // figure out the five most frequent letters in the remaining words
  getFiveMostFrequentLetters() {
    // figure out the frequencies
    const letterFrequencies = {};
    this.possibleWordsAndFreqs.forEach((waf) => {
      Array.from(waf.word).forEach((letter) => {
        if (letterFrequencies[letter] !== undefined) {
          letterFrequencies[letter] += 1;
        } else {
          letterFrequencies[letter] = 1;
        }
      });
    });
    // then sort to find the max, and return the 5 highest
    const sortedFreqs = Object.keys(letterFrequencies).sort((a, b) => {
      const freqA = letterFrequencies[a] || 0;
      const freqB = letterFrequencies[b] || 0;
      // sort descending
      return freqB - freqA;
    });
    return sortedFreqs.slice(0, 5);
  }

  // figure out which remaining word can be guessed using the input letters
  getWordWithLetters(letters) {
    const possibleWords = this.possibleWordsAndFreqs.filter((waf) => {
      const word = waf.word;
      for (let i = 0; i < letters.length; i++) {
        if (!word.includes(letters[i])) {
          return false;
        }
      }
      return true;
    });
    return possibleWords;
  }

  // first attempt at how to guess these things
  showBestGuess() {
    // idea: for the remaining words, figure out the five most frequent letters
    //       then guess a word containing all of those letters
    // TODO: handle hard mode
    const mostFreqLetters = this.getFiveMostFrequentLetters();
    console.log(`most frequent letters: ${mostFreqLetters.join(',')}`);
    const possibleGuesses = this.getWordWithLetters(mostFreqLetters);
    console.log('guesses:');
    console.log(possibleGuesses);
  }
}

// load the file containing words and frequencies
function loadWordAndFreqFile() {
  const allWordsAndFreqs = fs.readFileSync(path.resolve(__dirname, 'five-letter-words-and-frequencies.txt'), 'utf8').split('\n').map((line) => {
    const wordAndFreq = line.split(',');
    return {
      word: wordAndFreq[0],
      freq: wordAndFreq[1],
    }
  });
  return allWordsAndFreqs;
}


// solve today's wordle
const wordleSolver = new WordleSolver();

wordleSolver.showBestGuess();

wordleSolver.letterNotIncluded('f');
wordleSolver.letterNotIncluded('l');
wordleSolver.letterNotIncluded('u');
wordleSolver.letterNotIncluded('t');
wordleSolver.letterIncludedNotAtPosition('e', 4);
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuess();

wordleSolver.letterNotIncluded('a');
wordleSolver.letterNotIncluded('v');
wordleSolver.letterNotIncluded('o');
wordleSolver.letterNotIncluded('i');
wordleSolver.letterNotIncluded('d');
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuess();

wordleSolver.letterNotIncluded('j');
wordleSolver.letterIncludedAtPosition('e', 1);
wordleSolver.letterIncludedAtPosition('r', 2);
wordleSolver.letterIncludedAtPosition('k', 3);
wordleSolver.letterIncludedAtPosition('y', 4);
wordleSolver.howManyWordsLeft();

wordleSolver.showWords();
