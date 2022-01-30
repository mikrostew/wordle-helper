#!/usr/bin/env node
/* eslint-disable no-sync */

// select only words that are 5 letters long
// from word list at https://github.com/dwyl/english-words/blob/master/words_alpha.txt

const fs = require('fs');
const path = require('path');

const WORD_FILE_LOCATION = path.resolve(__dirname, '../word-lists/words-alpha.txt');
const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words.txt');

const allWords = fs.readFileSync(WORD_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((word) => word.trim());
const fiveLetterWords = allWords.filter((word) => word.length === 5);

console.log(`Found ${fiveLetterWords.length} five letter words`);

fs.writeFileSync(OUTPUT_FILE_LOCATION, fiveLetterWords.join('\n'), 'utf8');
