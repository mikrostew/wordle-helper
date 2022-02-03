import WordleHelper from './wordle-helper';
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
    .showHelpOnFail(false)
    .wrap(yargs().terminalWidth())
    .help()
    .version()
    .strictCommands()
    .parse(rawArgs);

  const verbose = parsedArgs.verbose;

  // let's solve this thing
  const wordleHelper = new WordleHelper();

  // limit of 6 guesses
  for (let guessNumber = 0; guessNumber < 6; guessNumber++) {
    const suggestions = wordleHelper.bestGuesses();
    console.log('suggestions:');
    console.log(suggestions.join(' ,'));

    const guess: { word: string } = await inquirer.prompt([{
      type: 'input',
      name: 'word',
      message: `What's your guess for word number ${guessNumber + 1}?`,
    }]);
    if (guess.word.length !== 5) {
      // TODO: allow try again? should be a way to validate w/ inquirer...
      throw new Error('5 letter words only');
    }
    for (let i = 0; i < guess.word.length; i++) {
      const letter = guess.word[i];
      const letterStatus = await inquirer.prompt([{
        type: 'list',
        name: 'status',
        message: `What is the status of letter '${letter.toUpperCase()}'?`,
        choices: [
          '(gray)   Not in the word',
          '(yellow) Right letter, wrong spot',
          '(green)  Right letter, right spot',
        ],
      }]);
      switch (letterStatus.status) {
      case '(gray)   Not in the word':
        wordleHelper.letterNotIncluded(letter);
        break;
      case '(yellow) Right letter, wrong spot':
        wordleHelper.letterIncludedNotAtPosition(letter, i);
        break;
      case '(green)  Right letter, right spot':
        wordleHelper.letterIncludedAtPosition(letter, i);
        break;
      default:
        console.log(letterStatus.status);
        throw new Error('bad choice here?');
      }
    }
  }
}
