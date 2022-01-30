# wordle-helper

Show some possible words for [Wordle](https://www.powerlanguage.co.uk/wordle/), based on guesses so far.

## word list

The initial word list comes from <https://github.com/dwyl/english-words/blob/master/words_alpha.txt>, stored at [words-alpha.txt](./word-lists/words-alpha.txt).
This contains 15918 5-letter words, which were selected using the [select-five-letter-words.js](./scripts/select-five-letter-words.js>) script, and stored at [five-letter-words.txt](./src/five-letter-words.txt).

## frequency count

The frequency count comes from <https://www.kaggle.com/rtatman/english-word-frequency>, stored at [unigram-freq.csv](./word-lists/unigram-freq.csv).
This somehow has 39933 5-letter words, which were selected using the [select-five-letter-frequencies.js](./scripts/select-five-letter-frequencies.js) script, and stored at [five-letter-frequencies.txt](./word-lists/five-letter-frequencies.txt).
Maybe there are some misspellings in that one, or something?

## combining words and frequencies

Those two lists were combined, using the [combine-words-frequencies.js](./scripts/combine-words-frequencies.js') script.
This gave 9383 5-letter words common to both lists.
That's probably good enough, because I doubt wordle will use something super obscure.
This is stored at [five-letter-words-and-frequencies.txt](./word-lists/five-letter-words-and-frequencies.txt), and that's the list I'll use in the code.

## the lists that wordle actually uses

From <https://www.reddit.com/r/wordle/comments/s4tcw8/a_note_on_wordles_word_list/>

answers: <https://gist.github.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b>

allowed words: <https://gist.github.com/cfreshman/cdcdf777450c5b5301e439061d29694c>

downloaded both of those

TODO: figure out:
* what answers are not in my lists
* what allowed words are not in my lists

TODO: is this a difference between US and British English?

## other references

Links that might be useful as I'm developing this

* <https://theconversation.com/wordle-the-best-word-to-start-the-game-according-to-a-language-researcher-175114>
* <https://www.reddit.com/r/wordle/comments/s88iq4/a_wordle_bot_leaderboard/>
