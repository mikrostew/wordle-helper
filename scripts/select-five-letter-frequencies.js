#!/usr/bin/env node

// select words from the frequency that are 5 letters long
// from word list at https://www.kaggle.com/rtatman/english-word-frequency

const fs = require('fs');

// first argument is location of the file
freqFileLocation = process.argv[2];

// array of 2-length arrays, word and frequency
const allWordsAndFreqs = fs.readFileSync(freqFileLocation, 'utf8').split('\n').map((line) => line.trim()).map((wordAndFreq) => wordAndFreq.split(','));

const fiveLetterFreqs = allWordsAndFreqs.filter((wordAndFreq) => wordAndFreq[0].length === 5);

console.log(`Found ${fiveLetterFreqs.length} five letter words`);

const whatToWrite = fiveLetterFreqs.map((wordAndFreq) => wordAndFreq.join(',')).join('\n');

fs.writeFileSync('five-letter-frequencies.txt', whatToWrite, 'utf8');
