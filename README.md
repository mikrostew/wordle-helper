# wordle-helper

Show some possible words for [Wordle](https://www.powerlanguage.co.uk/wordle/), based on guesses so far.

## word list

The initial word list comes from <https://github.com/dwyl/english-words/blob/master/words_alpha.txt>, stored at [words-alpha.txt](./word-lists/words-alpha.txt).
This contains 15918 5-letter words, which were selected using the [select-five-letter-words.js](./scripts/select-five-letter-words.js>) script, and stored at [five-letter-words.txt](./src/five-letter-words.txt).
This list is missing 12 words from the wordle answers (see below), so I added those to the end of the file.

## frequency count

The frequency count comes from <https://www.kaggle.com/rtatman/english-word-frequency>, stored at [unigram-freq.csv](./word-lists/unigram-freq.csv).
This somehow has 39933 5-letter words, which were selected using the [select-five-letter-frequencies.js](./scripts/select-five-letter-frequencies.js) script, and stored at [five-letter-frequencies.txt](./word-lists/five-letter-frequencies.txt).
Maybe there are some misspellings in that one, or something?
This list is missing 1 word from the wordle answers (see below), so I added that to the end of the file.

## combining words and frequencies

Those two lists were combined, using the [combine-words-frequencies.js](./scripts/combine-words-frequencies.js') script.
This gave 9383 5-letter words common to both lists.
That's probably good enough, because I doubt wordle will use something super obscure.
This is stored at [five-letter-words-and-frequencies.txt](./word-lists/five-letter-words-and-frequencies.txt), and that's the list I'll use in the code.

## the lists that wordle actually uses

There is a [reddit post](https://www.reddit.com/r/wordle/comments/s4tcw8/a_note_on_wordles_word_list/) that found the Wordle [answers](https://gist.github.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b) and [allowed words](https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c) from the source code.
I downloaded both of those, to figure out if I am missing anything in my list.

Looks like I am missing 13 answers, none of which are obscure:
```
$ ./scripts/find-missing-words.js
Found 15918 five letter words from 'words-alpha.txt'
Found 39933 five letter words from 'unigram-freq.csv'
Found 9383 five letter words from 'five-letter-words-and-frequencies.txt'
Found 2315 five letter words from 'wordle-answers-alphabetical.txt'
Found 10657 five letter words from 'wordle-allowed-guesses.txt'

Missing 12 words from 'words-alpha.txt'
["abled","cyber","detox","geeky","inbox","latte","nerdy","penne","pesto","ramen","rehab","wimpy"]
Missing 1 words from 'unigram-freq.csv'
["wooer"]
Missing 13 words from 'five-letter-words-and-frequencies.txt'
["abled","cyber","detox","geeky","inbox","latte","nerdy","penne","pesto","ramen","rehab","wimpy","wooer"]
```

I added those to words-alpha.txt and unigram-freq.csv (just making up a frequency), and re-ran the scripts, so now they are included.

```
$ ./scripts/select-five-letter-words.js; ./scripts/select-five-letter-frequencies.js; ./scripts/combine-words-frequencies.js
Found 15930 five letter words
Found 39934 five letter words
Found 9396 five letter words, with frequencies

$ ./scripts/find-missing-words.js
Found 15930 five letter words from 'words-alpha.txt'
Found 39934 five letter words from 'unigram-freq.csv'
Found 9396 five letter words from 'five-letter-words-and-frequencies.txt'
Found 2315 five letter words from 'wordle-answers-alphabetical.txt'
Found 10657 five letter words from 'wordle-allowed-guesses.txt'

Missing 0 words from 'words-alpha.txt'
[]
Missing 0 words from 'unigram-freq.csv'
[]
Missing 0 words from 'five-letter-words-and-frequencies.txt'
[]
```

TODO: what allowed words are not in my lists?
TODO: what extra words do I have?
TODO: is some of this a difference between US and British English?

## other references

Links that might be useful as I'm developing this

* <https://theconversation.com/wordle-the-best-word-to-start-the-game-according-to-a-language-researcher-175114>
* <https://www.reddit.com/r/wordle/comments/s88iq4/a_wordle_bot_leaderboard/>
