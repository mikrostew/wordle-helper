import { WordleHelper, WordGuess } from '../src/wordle-helper';

const TEST_WORDS_1 = [
  'abhor',
  'adobe',
  'axles',
  'beryl',
  'bolts',
  'buppy',
  'chefs',
  'comfy',
  'ditto',
  'envoy',
  'fetch',
  'geese',
];

describe('@getPossibleWords', () => {
  test('all words available at first', () => {
    const testWordleHelper = new WordleHelper(false, ['word1', 'word2']);
    expect(testWordleHelper.getPossibleWords()).toEqual(['word1', 'word2']);
  });
});

describe('@numWordsLeft', () => {
  test('all words available at first', () => {
    const testWordleHelper = new WordleHelper(false, ['word1', 'word2']);
    expect(testWordleHelper.numWordsLeft()).toEqual(2);
  });
});

describe('@registerGuess', () => {
  test('errors if word is not 5 chars long', () => {
    const testWordleHelper = new WordleHelper(false, ['word1', 'word2']);
    // only 4 letters
    const guessWrongLength: WordGuess = [
      { letter: 'w', color: 'green' },
      { letter: 'o', color: 'green' },
      { letter: 'r', color: 'green' },
      { letter: 'd', color: 'green' },
    ];
    expect(() => testWordleHelper.registerGuess(guessWrongLength)).toThrow('Word guess must be 5 letters long');
  });

  // TODO: more complicated tests of this
});

describe('@addGuessedLetter', () => {
  test.skip('TODO', () => {
    //const testWordleHelper = new WordleHelper(false, ['word1', 'word2']);
    expect(1).toEqual(1);
  });

  // TODO: more complicated tests of this
});

describe('@green', () => {
  test('filters matching words', () => {
    const testWordleHelper = new WordleHelper(false, TEST_WORDS_1);

    testWordleHelper.green('y', 4);
    expect(testWordleHelper.getPossibleWords()).toEqual([
      'buppy',
      'comfy',
      'envoy',
    ]);

    testWordleHelper.green('e', 0);
    expect(testWordleHelper.getPossibleWords()).toEqual(['envoy']);
  });

  test.skip('previous gray of the same letter', () => {
    const testWordleHelper = new WordleHelper(false, TEST_WORDS_1);

    // guess OODLE
    testWordleHelper.gray('o', 0);
    // problem: at this point, there are no possible words left
    testWordleHelper.green('o', 1);
    expect(testWordleHelper.getPossibleWords()).toEqual([
      'bolts',
      'comfy',
    ]);
  });

  test('errors for conflicting letters', () => {
    const testWordleHelper = new WordleHelper(false, TEST_WORDS_1);

    testWordleHelper.green('o', 1);
    expect(testWordleHelper.getPossibleWords()).toEqual([
      'bolts',
      'comfy',
    ]);

    expect(() => testWordleHelper.green('y', 1)).toThrow('Position 1 is already green with a different letter');
  });
});

describe('@gray', () => {
  test.skip('previous green of the same letter', () => {
    const testWordleHelper = new WordleHelper(false, TEST_WORDS_1);
    // guess COLOR
    testWordleHelper.green('o', 1);
    testWordleHelper.gray('o', 3);
    // problem: at this point, there are no possible words left
    expect(testWordleHelper.getPossibleWords()).toEqual([
      'bolts',
      'comfy',
    ]);
  });
})
