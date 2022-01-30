#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// inline these words so I don't have to use fs
// load the file containing words and frequencies
const allWordsAndFreqs = fs
  .readFileSync(
    path.resolve(__dirname, '../src/five-letter-words-and-frequencies.txt'),
    'utf8',
  );
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

fs.writeFileSync(
  path.resolve(__dirname, '../src/words.ts'),
  fileContents,
  'utf8',
);
