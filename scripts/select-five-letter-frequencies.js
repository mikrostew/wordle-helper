#!/usr/bin/env node
/* eslint-disable no-sync */

// select words from the frequency that are 5 letters long
// from word list at https://www.kaggle.com/rtatman/english-word-frequency

const fs = require('fs');
const path = require('path');

const FREQ_FILE_LOCATION = path.resolve(__dirname, '../word-lists/unigram-freq.csv');
const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-frequencies.txt');

// array of 2-length arrays, word and frequency
const allWordsAndFreqs = fs.readFileSync(FREQ_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .map((wordAndFreq) => wordAndFreq.split(','));

const fiveLetterFreqs = allWordsAndFreqs
  .filter((wordAndFreq) => wordAndFreq[0].length === 5);

console.log(`Found ${fiveLetterFreqs.length} five letter words`);

const whatToWrite = fiveLetterFreqs
  .map((wordAndFreq) => wordAndFreq.join(','))
  .join('\n');

fs.writeFileSync(OUTPUT_FILE_LOCATION, whatToWrite, 'utf8');
