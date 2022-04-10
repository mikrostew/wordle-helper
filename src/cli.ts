import { WordGuess, WordleHelper } from './wordle-helper';
import chalk from 'chalk';
import inquirer from 'inquirer';
import yargs from 'yargs/yargs';

interface FormattedLetter {
  green: string;
  yellow: string;
  gray: string;
}

export async function run(rawArgs: string[]): Promise<void> {
  const parsedArgs = await yargs()
    .usage(
      'Usage:\n  wordle-helper [options]\n\nCLI for helping you solve today\'s Wordle (https://www.powerlanguage.co.uk/wordle/)',
    )
    .options({
      verbose: {
        alias: 'v',
        type: 'boolean',
        describe: 'show more info about what is going on',
      },
    })
    // TODO: option for --mode=total|positional (default is positional)
    .showHelpOnFail(false)
    .wrap(yargs().terminalWidth())
    .help()
    .version()
    .strictCommands()
    .parse(rawArgs);

  const verbose = Boolean(parsedArgs.verbose);

  // let's solve this thing
  const wordleHelper = new WordleHelper(verbose);
  // keep track of what has been found, to avoid repetitive prompts
  const foundLetters = ['', '', '', '', ''];
  const guessWords = ['', '', '', '', '', ''];
  const guessPositions = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

  // limit of 6 guesses
  for (let guessNumber = 0; guessNumber < 6; guessNumber++) {
    const suggestions = wordleHelper.bestGuesses();
    console.log('suggestions:');
    console.log(suggestions.join(', '));

    const guess: { word: string } = await inquirer.prompt([{
      type: 'input',
      name: 'word',
      message: `What was your ${guessPositions[guessNumber]} guess?`,
      transformer: (input) => input.toUpperCase(),
      validate: (input) => {
        if (/[a-zA-Z]{5}/.test(input)) {
          return true;
        }
        return 'Please enter a 5-letter word';
      },
    }]);
    if (verbose) {
      console.log('guess:', guess);
    }

    const wordGuess: WordGuess = [];

    for (let i = 0; i < guess.word.length; i++) {
      const letter = guess.word[i];
      const formatted = formatLetter(letter);
      if (letter === foundLetters[i]) {
        // spaced to line up nicely under the other letters
        console.log(`  (already found letter)    ${formatted.green}`);
        guessWords[guessNumber] += ` ${formatted.green}`;
        wordGuess[i] = {
          letter,
          color: 'green',
        };
        continue;
      }
      const letterStatus = await inquirer.prompt([{
        type: 'list',
        name: 'status',
        message: `What color is letter '${letter.toUpperCase()}'?`,
        choices: [
          `${formatted.gray} (gray)`,
          `${formatted.yellow} (yellow)`,
          `${formatted.green} (green)`,
        ],
      }]);
      const statusText = letterStatus.status;
      switch (true) {
      case /gray/.test(statusText):
        wordGuess[i] = {
          letter,
          color: 'gray',
        };
        guessWords[guessNumber] += ` ${formatted.gray}`;
        break;
      case /yellow/.test(statusText):
        wordGuess[i] = {
          letter,
          color: 'yellow',
        };
        guessWords[guessNumber] += ` ${formatted.yellow}`;
        break;
      case /green/.test(statusText):
        wordGuess[i] = {
          letter,
          color: 'green',
        };
        foundLetters[i] = letter;
        guessWords[guessNumber] += ` ${formatted.green}`;
        break;
      default:
        console.log(letterStatus.status);
        throw new Error('bad choice here?');
      }
    }
    // did we find all the letters?
    if (foundLetters.every((l) => l !== '')) {
      console.log('done!');
      console.log('');
      // make a nice printout of all the guesses (similar to Wordle)
      console.log(guessWords.filter((line) => line !== '').join('\n\n'));
      process.exit();
    }
    // register this guess, so the word suggestions will be updated
    wordleHelper.registerGuess(wordGuess);
  }
  console.log('Didn\'t find the answer :(');
}

// letter formatting
function formatLetter(letter: string): FormattedLetter {
  return {
    green: chalk.black.bgGreen(` ${letter.toUpperCase()} `),
    yellow: chalk.black.bgYellow(` ${letter.toUpperCase()} `),
    gray: chalk.black.bgGray(` ${letter.toUpperCase()} `),
  };
}
