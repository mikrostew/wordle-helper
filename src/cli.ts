import WordleHelper from './wordle-helper';

export function run() {
  // TODO: some kind of interactive CLI, because this way is not great
  const wordleHelper = new WordleHelper();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('s');
  wordleHelper.letterNotIncluded('a');
  wordleHelper.letterIncludedNotAtPosition('l', 2);
  wordleHelper.letterNotIncluded('e');
  wordleHelper.letterIncludedAtPosition('t', 4);
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('b');
  wordleHelper.letterNotIncluded('u');
  wordleHelper.letterIncludedNotAtPosition('i', 2);
  wordleHelper.letterIncludedNotAtPosition('l', 3);
  wordleHelper.letterIncludedAtPosition('t', 4);
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  // There are 4 words left now
  // some guesses:
  // [ 'licht', 'licit', 'light', 'limit' ]
  // 'light' is the word!
}
