#!/usr/bin/env node
/* eslint-disable no-sync */

// combine valid words and their frequencies

const fs = require('fs');
const path = require('path');

const WORD_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words.txt');
const FREQ_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-frequencies.txt');
const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words-and-frequencies.txt');

// read both of those files
const fiveLetterWords = fs.readFileSync(WORD_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((word) => word.trim());
const fiveLetterWordFreqs = fs.readFileSync(FREQ_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .map((wordAndFreq) => wordAndFreq.split(','));

// add the valid 5-letter words into a hashmap, for quick access
const validFiveLetterWords = {};
fiveLetterWords.forEach((word) => validFiveLetterWords[word] = true);

// select valid words from the frequency list
const validWordsAndFreqs = fiveLetterWordFreqs
  .filter((wordAndFreq) => validFiveLetterWords[wordAndFreq[0]] === true);

console.log(`Found ${validWordsAndFreqs.length} five letter words, with frequencies`);

const whatToWrite = validWordsAndFreqs
  .map((wordAndFreq) => wordAndFreq.join(','))
  .join('\n');

fs.writeFileSync(OUTPUT_FILE_LOCATION, whatToWrite, 'utf8');
