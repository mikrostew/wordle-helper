#!/usr/bin/env node
/* eslint-disable no-sync */

// figure out what wordle words I'm missing from wordle's list

const fs = require('fs');
const path = require('path');

const WORD_FILE_LOCATION = path.resolve(__dirname, '../word-lists/words-alpha.txt');
const FREQ_FILE_LOCATION = path.resolve(__dirname, '../word-lists/unigram-freq.csv');
const COMBINED_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words-and-frequencies.txt');
const WORDLE_ANSWERS_FILE_LOCATION = path.resolve(__dirname, '../word-lists/wordle-answers-alphabetical.txt');
const WORDLE_GUESSES_FILE_LOCATION = path.resolve(__dirname, '../word-lists/wordle-allowed-guesses.txt');

// const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../word-lists/five-letter-words.txt');

const allWords = fs.readFileSync(WORD_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((word) => word.trim())
  .filter((word) => word.length === 5);
const allFreqs = fs.readFileSync(FREQ_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .map((wordAndFreq) => wordAndFreq.split(',')[0])
  .filter((word) => word.length === 5);
const combinedWordsAndFreqs = fs.readFileSync(COMBINED_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .map((wordAndFreq) => wordAndFreq.split(',')[0]);
const wordleAnswers = fs.readFileSync(WORDLE_ANSWERS_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((word) => word.trim());
const wordleGuesses = fs.readFileSync(WORDLE_GUESSES_FILE_LOCATION, 'utf8')
  .split('\n')
  .map((word) => word.trim());


console.log(`Found ${allWords.length} five letter words from 'words-alpha.txt'`);
console.log(`Found ${allFreqs.length} five letter words from 'unigram-freq.csv'`);
console.log(`Found ${combinedWordsAndFreqs.length} five letter words from 'five-letter-words-and-frequencies.txt'`);
console.log(`Found ${wordleAnswers.length} five letter words from 'wordle-answers-alphabetical.txt'`);
console.log(`Found ${wordleGuesses.length} five letter words from 'wordle-allowed-guesses.txt'`);

// what answers are not in my lists?
const setOfAlpha = new Set(allWords);
const setOfFreqs = new Set(allFreqs);
const setOfBoth = new Set(combinedWordsAndFreqs);
const missingFromAlpha = wordleAnswers.filter((word) => !setOfAlpha.has(word));
const missingFromFreqs = wordleAnswers.filter((word) => !setOfFreqs.has(word));
const missingFromBoth = wordleAnswers.filter((word) => !setOfBoth.has(word));

console.log('');
console.log(`Missing ${missingFromAlpha.length} words from 'words-alpha.txt'`);
console.log(JSON.stringify(missingFromAlpha));
console.log(`Missing ${missingFromFreqs.length} words from 'unigram-freq.csv'`);
console.log(JSON.stringify(missingFromFreqs));
console.log(`Missing ${missingFromBoth.length} words from 'five-letter-words-and-frequencies.txt'`);
console.log(JSON.stringify(missingFromBoth));
