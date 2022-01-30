import WordleHelper from './wordle-helper';

export function run() {
  // TODO: some kind of interactive CLI, because this way is not great
  const wordleHelper = new WordleHelper();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('a');
  wordleHelper.letterIncludedAtPosition('r', 1);
  wordleHelper.letterNotIncluded('o');
  wordleHelper.letterNotIncluded('s');
  wordleHelper.letterNotIncluded('e');
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('t');
  wordleHelper.letterIncludedAtPosition('r', 1);
  wordleHelper.letterIncludedAtPosition('u', 2);
  wordleHelper.letterNotIncluded('l');
  wordleHelper.letterNotIncluded('y');
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('c');
  wordleHelper.letterIncludedAtPosition('r', 1);
  wordleHelper.letterIncludedAtPosition('u', 2);
  wordleHelper.letterNotIncluded('m');
  wordleHelper.letterNotIncluded('b');
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  wordleHelper.letterNotIncluded('d');
  wordleHelper.letterIncludedAtPosition('r', 1);
  wordleHelper.letterIncludedAtPosition('u', 2);
  wordleHelper.letterIncludedAtPosition('n', 3);
  wordleHelper.letterNotIncluded('k');
  wordleHelper.howManyWordsLeft();

  wordleHelper.showBestGuesses();

  // There are 1 words left now
  // guesses:
  // [ 'wrung' ]
}
