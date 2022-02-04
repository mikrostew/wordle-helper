import WordleHelper from './wordle-helper';
import chalk from 'chalk';
import inquirer from 'inquirer';
import yargs from 'yargs/yargs';

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

  // limit of 6 guesses
  for (let guessNumber = 0; guessNumber < 6; guessNumber++) {
    const suggestions = wordleHelper.bestGuesses();
    console.log('suggestions:');
    console.log(suggestions.join(' ,'));

    const guess: { word: string } = await inquirer.prompt([{
      type: 'input',
      name: 'word',
      message: `What's your guess for word number ${guessNumber + 1}?`,
      validate: (input) => {
        if (/[a-zA-Z]{5}/.test(input)) {
          return true;
        }
        return 'Please enter a 5-letter word';
      },
    }]);
    for (let i = 0; i < guess.word.length; i++) {
      const letter = guess.word[i];
      if (letter === foundLetters[i]) {
        // spaced to line up nicely under the other letters
        console.log(`  (already found letter)            ${chalk.black.bgGreen(letter.toUpperCase())}`);
        continue;
      }
      const letterStatus = await inquirer.prompt([{
        type: 'list',
        name: 'status',
        message: `What is the status of letter '${letter.toUpperCase()}'?`,
        choices: [
          `${chalk.black.bgGray(letter.toUpperCase())} (gray)   Not in the word`,
          `${chalk.black.bgYellow(letter.toUpperCase())} (yellow) Right letter, wrong spot`,
          `${chalk.black.bgGreen(letter.toUpperCase())} (green)  Right letter, right spot`,
        ],
      }]);
      const statusText = letterStatus.status;
      switch (true) {
      case /gray/.test(statusText):
        wordleHelper.letterNotIncluded(letter);
        break;
      case /yellow/.test(statusText):
        wordleHelper.letterIncludedNotAtPosition(letter, i);
        break;
      case /green/.test(statusText):
        wordleHelper.letterIncludedAtPosition(letter, i);
        foundLetters[i] = letter;
        break;
      default:
        console.log(letterStatus.status);
        throw new Error('bad choice here?');
      }
    }
    // did we find all the letters?
    if (foundLetters.every((l) => l !== '')) {
      console.log(`The answer is ${chalk.black.bgGreen(guess.word.toUpperCase())}!`);
      process.exit();
    }
  }
  console.log('Didn\'t find the answer :(');
}
