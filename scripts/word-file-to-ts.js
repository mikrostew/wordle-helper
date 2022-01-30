#!/usr/bin/env node
/* eslint-disable no-sync */

const fs = require('fs');
const path = require('path');

const COMBINED_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words-and-frequencies.txt');
const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../src/words.ts');

// inline these words so I don't have to use fs
// load the file containing words and frequencies
const allWordsAndFreqs = fs.readFileSync(COMBINED_FILE_LOCATION, 'utf8');
const parsedWordsAndFreqs = allWordsAndFreqs
  .split('\n')
  .map((line) => {
    const wordAndFreq = line.split(',');
    return {
      word: wordAndFreq[0],
      freq: parseInt(wordAndFreq[1]),
    };
  });

const fileContents
= `export interface WordAndFreq {
  word: string;
  freq: number;
}

export const WORDS = ${JSON.stringify(parsedWordsAndFreqs, null, 2)};`;

fs.writeFileSync(OUTPUT_FILE_LOCATION, fileContents, 'utf8');
