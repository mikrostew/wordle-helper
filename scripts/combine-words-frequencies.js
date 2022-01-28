#!/usr/bin/env node

// combine valid words and their frequencies

const fs = require('fs');

// first argument is location of the word file
wordFileLocation = process.argv[2];
// second argument is location of the frequency file
freqFileLocation = process.argv[3];

// read both of those files
const fiveLetterWords = fs.readFileSync(wordFileLocation, 'utf8').split('\n').map((word) => word.trim());
const fiveLetterWordFreqs = fs.readFileSync(freqFileLocation, 'utf8').split('\n').map((line) => line.trim()).map((wordAndFreq) => wordAndFreq.split(','));

// add the valid 5-letter words into a hashmap, for quick access
const validFiveLetterWords = {};
fiveLetterWords.forEach((word) => validFiveLetterWords[word] = true);

// select valid words from the frequency list
const validWordsAndFreqs = fiveLetterWordFreqs.filter((wordAndFreq) => {
  if (wordAndFreq[0] === 'oggkl') {
    console.log(validFiveLetterWords['oggkl']);
    return false;
  }
  return validFiveLetterWords[wordAndFreq[0]] === true
});

console.log(`Found ${validWordsAndFreqs.length} five letter words, with frequencies`);

const whatToWrite = validWordsAndFreqs.map((wordAndFreq) => wordAndFreq.join(',')).join('\n');

fs.writeFileSync('five-letter-words-and-frequencies.txt', whatToWrite, 'utf8');
