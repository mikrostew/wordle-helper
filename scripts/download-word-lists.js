#!/usr/bin/env node
/* eslint-disable no-sync */


const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// apparently NYT bought Wordle, so now it's here
const WORDLE_BASE_URL = 'https://www.nytimes.com/games/wordle';
const WORDLE_MAIN = `${WORDLE_BASE_URL}/index.html`;

const OUTPUT_FILE_LOCATION = path.resolve(__dirname, '../src/words.ts');

// for downloading a single file to a variable
async function downloadFile(url) {
  const response = await fetch(url);
  const body = response.text();
  return body;
}

// looking for something like this in the page:
// <script src="main.da722f54.js"></script>
function findScriptFile(indexHtmlContents) {
  const regexMatches = /<script src="(.*\.js)"><\/script>/.exec(indexHtmlContents);
  if (regexMatches && regexMatches[1]) {
    return regexMatches[1];
  }
  throw new Error('Could not find script location!');
}

// parse the word lists out of the code
function extractWordLists(scriptContents) {
  // find arrays of 5-letter words, separated by commas
  //  answers are currently Ma=["cigar",...]
  //  allowed words are currently Oa=["aahed",...]
  // I _should_ be able to do this with regex...
  //  (?:x) is a non-capturing group
  const wordLists = [];
  const wordArrayRegex = /\["[a-z]{5}"(?:,"[a-z]{5}")+\]/g;
  let arrayMatches;

  // pull out the matches
  while ((arrayMatches = wordArrayRegex.exec(scriptContents)) !== null) {
    wordLists.push(JSON.parse(arrayMatches[0]));
  }

  // there should be two lists
  if (wordLists.length !== 2) {
    throw new Error(`Expected 2 word lists, but found ${wordLists.length}!`);
  }
  return wordLists;
}


// wrapped so I can use await in this
(async () => {
  // pull down the main file, and figure out the script location
  const indexHtmlContents = await downloadFile(WORDLE_MAIN);
  const scriptFile = findScriptFile(indexHtmlContents);
  console.log(`Script file is: ${scriptFile}`);

  // pull down the script file, and figure out the word lists
  const scriptContents = await downloadFile(`${WORDLE_BASE_URL}/${scriptFile}`);
  const wordLists = extractWordLists(scriptContents);
  console.log(`Found ${wordLists.length} word lists, with ${wordLists[0].length} words and ${wordLists[1].length} words in them`);

  // remove any duplicates and sort
  const uniques = [...new Set(wordLists[0].concat(wordLists[1]))];
  const sorted = uniques.sort();
  console.log(`Final words array is ${sorted.length} words`);

  // write those to a file
  const fileContents
= `/* eslint-disable */
export const WORDS = ${JSON.stringify(sorted, null, 2)};`;

  fs.writeFileSync(OUTPUT_FILE_LOCATION, fileContents, 'utf8');
})();
