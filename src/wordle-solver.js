const fs = require('fs');
const path = require('path');

// TODO: use typescript
// TODO: also use eslint and prettier

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

  // figure out the order of most frequent letters in the remaining words
  // TODO: do this positionally
  getMostFrequentLetters() {
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
    // then sort to find the max
    const sortedFreqs = Object.keys(letterFrequencies).sort((a, b) => {
      const freqA = letterFrequencies[a] || 0;
      const freqB = letterFrequencies[b] || 0;
      // sort descending
      return freqB - freqA;
    });
    return sortedFreqs
  }

  // figure out which remaining word can be guessed using the input letter frequencies
  getWordsWithLetters(letters, numWordsToFind) {
    // start by using the top 5 letters,
    // then increase number of letters until target num of words is found
    const foundWords = {};
    for (let useNumLetters = 5; useNumLetters <= letters.length; useNumLetters++) {
      //console.log(`trying with ${useNumLetters} letters`);
      const possibleWords = this.possibleWordsAndFreqs.filter((waf) => {
        const word = waf.word;
        // filter out words that use letters outside the top ones selected
        for (let i = useNumLetters; i < letters.length; i++) {
          if (word.includes(letters[i])) {
            return false;
          }
        }
        return true;
      });
      //console.log(`found ${possibleWords.length} possible words`);
      // TODO: sort words without duplicates to the top?
      //console.log(possibleWords);
      // check if we found all the words yet
      for (let w = 0; w < possibleWords.length; w++) {
        // using more letters will cause duplicates with previous words, prevent that with a "set", of sorts
        foundWords[possibleWords[w].word] = true;
        if (Object.keys(foundWords).length >= numWordsToFind) {
          return Object.keys(foundWords);
        }
      }
    }

    // found fewer than numWordsToFind
    return Object.keys(foundWords);
  }

  // show suggestions that work, in order of frequency
  showBestGuesses() {
    // idea: for the remaining words, figure out the five most frequent letters
    //       then guess a word containing all of those letters
    // TODO: does this already do hard mode?
    const mostFreqLetters = this.getMostFrequentLetters();
    //console.log(`most frequent letters (high to low): ${mostFreqLetters.join(',')}`);
    // show 5 best guesses
    const possibleGuesses = this.getWordsWithLetters(mostFreqLetters, 20);
    console.log('some guesses:');
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


// TODO: some kind of interactive CLI, because this way is not great

const wordleSolver = new WordleSolver();

wordleSolver.showBestGuesses();

wordleSolver.letterNotIncluded('a');
wordleSolver.letterIncludedAtPosition('r', 1);
wordleSolver.letterNotIncluded('o');
wordleSolver.letterNotIncluded('s');
wordleSolver.letterNotIncluded('e');
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuesses();

wordleSolver.letterNotIncluded('t');
wordleSolver.letterIncludedAtPosition('r', 1);
wordleSolver.letterIncludedAtPosition('u', 2);
wordleSolver.letterNotIncluded('l');
wordleSolver.letterNotIncluded('y');
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuesses();

wordleSolver.letterNotIncluded('c');
wordleSolver.letterIncludedAtPosition('r', 1);
wordleSolver.letterIncludedAtPosition('u', 2);
wordleSolver.letterNotIncluded('m');
wordleSolver.letterNotIncluded('b');
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuesses();

wordleSolver.letterNotIncluded('d');
wordleSolver.letterIncludedAtPosition('r', 1);
wordleSolver.letterIncludedAtPosition('u', 2);
wordleSolver.letterIncludedAtPosition('n', 3);
wordleSolver.letterNotIncluded('k');
wordleSolver.howManyWordsLeft();

wordleSolver.showBestGuesses();

// There are 1 words left now
// guesses:
// [ 'wrung' ]
