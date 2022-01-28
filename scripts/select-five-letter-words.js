#!/usr/bin/env node

// select only words that are 5 letters long
// from word list at https://github.com/dwyl/english-words/blob/master/words_alpha.txt

const fs = require('fs');

// first argument is location of the word file
wordFileLocation = process.argv[2];

const allWords = fs.readFileSync(wordFileLocation, 'utf8').split('\n');
const fiveLetterWords = allWords.filter((word) => word.trim().length === 5);

console.log(`Found ${fiveLetterWords.length} five letter words`);

fs.writeFileSync('five-letter-words.txt', fiveLetterWords.join('\n'), 'utf8');
