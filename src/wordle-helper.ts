import { WORDS } from './words';

interface LetterFrequency {
  [letter: string]: number;
}

interface ScoredWord {
  word: string;
  score: number;
}

export type LetterColor = 'green' | 'yellow' | 'gray';

interface LetterStatus {
  letter: string;
  color: LetterColor;
}

export type WordGuess = LetterStatus[];

export class WordleHelper {
  // using an array for this hasn't been too slow so far
  private possibleWords: string[];
  private lettersGuessed: LetterStatus[][];
  private verbose: boolean;

  constructor(
    verbose: boolean,
    possibleWords: string[] = WORDS,
  ) {
    this.verbose = verbose;
    this.possibleWords = possibleWords;
    this.lettersGuessed = [];
  }

  // return all the words that are still possible
  getPossibleWords(): string[] {
    return this.possibleWords;
  }

  // return the number of words that are still possible
  numWordsLeft(): number {
    return this.possibleWords.length;
  }

  registerGuess(wordGuess: WordGuess) {
    if (wordGuess.length !== 5) {
      throw new Error(`Word guess must be 5 letters long, received ${wordGuess.length} letters`);
    }
    for (let position = 0; position < wordGuess.length; position++) {
      const { letter, color } = wordGuess[position];
      switch (color) {
      case 'green':
        this.green(letter, position);
        break;
      case 'yellow':
        this.yellow(letter, position);
        break;
      case 'gray':
        this.gray(letter, position);
        break;
      default:
        console.log(`bad color input - ${color}`);
      }
    }
  }

  // track what letters are included, error for conflicting inputs
  addGuessedLetter(letter: string, position: number, color: LetterColor) {
    if (this.lettersGuessed[position]) {
      // already have some guesses here
      // TODO: have to check for conflicts & logic issues first
      if (color === 'green') {
        if (this.lettersGuessed[position].some((e) => e.color === 'green' && e.letter !== letter )) {
          throw new Error(`Position ${position} is already green with a different letter`);
        }
      }
      this.lettersGuessed[position].push({ letter, color });
    } else {
      // no guesses for this position yet
      // TODO: have to check for conflicts & logic issues first
      this.lettersGuessed[position] = [];
      this.lettersGuessed[position].push({ letter, color });
    }
  }

  // green: when a letter is part of the word, at a specific position
  green(letter: string, position: number) {
    const lowercase = letter.toLowerCase();
    this.addGuessedLetter(lowercase, position, 'green');
    this.possibleWords = this.possibleWords.filter(
      (word) => word[position] === lowercase,
    );
  }

  // yellow: when a letter is part of the word, but is not at the specified position
  yellow(letter: string, position: number) {
    const lowercase = letter.toLowerCase();
    this.addGuessedLetter(lowercase, position, 'yellow');
    this.possibleWords = this.possibleWords.filter(
      (word) => word.includes(lowercase) && word[position] !== lowercase,
    );
  }

  // gray happens when:
  // * the letter is not part of the word at all
  // * the letter is not duplicated (e.g. one 'e' is yellow, another 'e' in the same guess is gray --> there is only one 'e')
  gray(letter: string, position: number) {
    const lowercase = letter.toLowerCase();
    this.addGuessedLetter(lowercase, position, 'gray');
    this.possibleWords = this.possibleWords.filter(
      (word) => !word.includes(lowercase),
    );
  }

  // figure out the order of most frequent letters in the remaining words
  getMostFrequentLetters() {
    // figure out the frequencies
    const letterFrequencies: { [key: string]: number } = {};
    this.possibleWords.forEach((word) => {
      Array.from(word).forEach((letter) => {
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
    return sortedFreqs;
  }

  // figure out which remaining word can be guessed using the input letter frequencies
  getWordsByTotalFreq(letters: string[], numWordsToFind: number) {
    // start by using the top 5 letters,
    // then increase number of letters until target num of words is found
    // TODO: or, just do all the words, and slice later
    const foundWords = new Set<string>();
    for (
      let useNumLetters = 5;
      useNumLetters <= letters.length;
      useNumLetters++
    ) {
      // console.log(`trying with ${useNumLetters} letters`);
      const possibleWords = this.possibleWords.filter((word) => {
        // filter out words that use letters outside the top ones selected
        for (let i = useNumLetters; i < letters.length; i++) {
          if (word.includes(letters[i])) {
            return false;
          }
        }
        return true;
      });
      if (this.verbose) {
        console.log(`found ${possibleWords.length} possible words`);
      }
      // TODO: sort words without duplicate letters to the top
      // console.log(possibleWords);
      // check if we found all the words yet
      for (let w = 0; w < possibleWords.length; w++) {
        // using more letters will cause duplicates with previous words, prevent that with a set
        foundWords.add(possibleWords[w]);
        if (foundWords.size >= numWordsToFind) {
          return Array.from(foundWords);
        }
      }
    }

    // found fewer than numWordsToFind
    return Array.from(foundWords);
  }

  // assign a score to letters in each position of the word
  // (naive approach - score is count of how many times the letter shows up)
  getLetterPositions(): LetterFrequency[] {
    // figure out the frequencies by letter position
    const positionalFrequencies: { [letter: string]: number }[] = new Array(5).fill({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
      h: 0,
      i: 0,
      j: 0,
      k: 0,
      l: 0,
      m: 0,
      n: 0,
      o: 0,
      p: 0,
      q: 0,
      r: 0,
      s: 0,
      t: 0,
      u: 0,
      v: 0,
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    });
    this.possibleWords.forEach((word) => {
      const letters = Array.from(word);
      for (let position = 0; position < letters.length; position++) {
        const letter = letters[position];
        positionalFrequencies[position][letter] += 1;
      }
    });
    return positionalFrequencies;
  }

  getWordsByPositionalFreq(positionalFrequencies: LetterFrequency[], numWordsToFind: number): string[] {
    // iterate all remaining words, giving each a score
    const scoredWords: ScoredWord[] = this.possibleWords.map((word) => {
      const letters = Array.from(word);
      let score = 0;
      for (let position = 0; position < letters.length; position++) {
        const letter = letters[position];
        score += positionalFrequencies[position][letter];
      }
      return {
        word,
        score,
      };
    });
    // sort words by score, descending
    const sortedWords = scoredWords.sort((a, b) => b.score - a.score);
    // prefer words without repeated letters
    const nonRepeated: ScoredWord[] = [];
    const repeated: ScoredWord[] = [];
    sortedWords.forEach((was) => {
      if (Array.from(was.word).length === new Set(was.word).size) {
        nonRepeated.push(was);
      } else {
        repeated.push(was);
      }
    });
    // return the top X words
    return nonRepeated
      .concat(repeated)
      .slice(0, numWordsToFind)
      .map((w) => w.word);
  }

  // show suggestions that work, in order of frequency
  bestGuesses(): string[] {
    // idea: for the remaining words, figure out the five most frequent letters
    //       then guess a word containing all of those letters
    // TODO: does this already do hard mode?

    // if (this.verbose) {
    //   console.log('Using letter frequency strategy');
    // }
    // const mostFreqLetters = this.getMostFrequentLetters();
    // if (this.verbose) {
    //   console.log(`most frequent letters (high to low): ${mostFreqLetters.join(',')}`);
    // }
    // show 20 best guesses
    // const possibleGuesses = this.getWordsByTotalFreq(mostFreqLetters, 20);

    // TODO: option for positional strategy
    if (this.verbose) {
      console.log('Using positional letter frequency strategy');
    }
    const positionalLetters = this.getLetterPositions();
    // if (this.verbose) {
    //   console.log(`positional letter frequencies: TODO`);
    // }
    // show 20 best guesses
    const possibleGuesses = this.getWordsByPositionalFreq(positionalLetters, 20);

    return possibleGuesses;
  }
}
