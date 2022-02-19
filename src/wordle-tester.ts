import { LetterColor, WordGuess, WordleHelper } from './wordle-helper';
import { WORDS } from './words';
import chalk from 'chalk';

// for some nice output
// letter formatting
function formatLetter(letter: string, color: LetterColor): string {
  switch (color) {
  case 'green': return chalk.black.bgGreen(` ${letter.toUpperCase()} `);
  case 'yellow': return chalk.black.bgYellow(` ${letter.toUpperCase()} `);
  case 'gray': return chalk.black.bgGray(` ${letter.toUpperCase()} `);
  }
}

function formatWordStatus(status: WordGuess): string {
  return status.map((ls) => formatLetter(ls.letter, ls.color)).join('');
}

// try to solve for all the words in the list
const allWords = WORDS;
const howManyGuessesItTook: { [key: number]: number } = {};
// more concise way to initialize?
for (let i = 1; i <= 10; i++) {
  howManyGuessesItTook[i] = 0;
}

for (let wordNumber = 0; wordNumber < allWords.length; wordNumber++) {
  const targetWord = allWords[wordNumber];

  const wordleHelper = new WordleHelper(false);

  let numGuesses;
  for (numGuesses = 1; numGuesses <= 10; numGuesses++) {
    // first, just get the initial guess
    // TODO: figure out which word is best to use first?
    const guesses = wordleHelper.bestGuesses();

    // take the first one as the best
    if (guesses.length === 0) {
      throw new Error('no more words available - fail!');
    }
    const wordGuessed = guesses[0];
    // console.log(`Guess #${numGuesses}: ${wordGuessed}`);

    // compare that to the target word
    // at first, assume everything is not in the word
    // TODO: handle upper/lowercase
    const guessedLetters = Array.from(wordGuessed);
    const wordStatus: WordGuess = guessedLetters.map((letter) => ({
      letter,
      color: 'gray',
    }));

    for (let i = 0; i < guessedLetters.length; i++) {
      const currentLetter = guessedLetters[i];
      if (currentLetter === targetWord[i]) {
        wordStatus[i].color = 'green';
      } else if (!targetWord.includes(currentLetter)) {
        wordStatus[i].color = 'gray';
      } else {
        // TODO: there may be multiple letters in the world, handle that
        wordStatus[i].color = 'yellow';
      }
    }

    // update the helper
    console.log(formatWordStatus(wordStatus));
    wordleHelper.registerGuess(wordStatus);

    // if we found everything, that's it
    if (wordStatus.every((ls) => ls.color === 'green')) {
      break;
    }
  }

  console.log(`word ${wordNumber}/${allWords.length} took ${numGuesses} guesses!`);
  if (numGuesses > 6) {
    console.log('FAIL!');
  }
  howManyGuessesItTook[numGuesses]++;
}

// TODO: print out the stats nicely
console.log(JSON.stringify(howManyGuessesItTook, null, 2));
