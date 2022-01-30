# wordle-helper

Show some possible words for [Wordle](https://www.powerlanguage.co.uk/wordle/), based on guesses so far.

## word list

The initial word list comes from <https://github.com/dwyl/english-words/blob/master/words_alpha.txt>, which contains 15918 5-letter words (selected using the [select-five-letter-words.js](./scripts/select-five-letter-words.js>) script), stored at [five-letter-words.txt](./src/five-letter-words.txt).

## frequency count

The frequency count comes from <https://www.kaggle.com/rtatman/english-word-frequency>, which somehow has 39933 5-letter words (selected using the [select-five-letter-frequencies.js](./scripts/select-five-letter-frequencies.js) script), stored at [five-letter-frequencies.txt](./src/five-letter-frequencies.txt). Maybe there are some misspellings in that one?

## combining words and frequencies

Combining those two lists (using the [combine-words-frequencies.js](./scripts/combine-words-frequencies.js') script), gives 9383 5-letter words common to both lists. Probably good enough, because I doubt wordle will use something super obscure. This is stored at [five-letter-words-and-frequencies.txt](./src/five-letter-words-and-frequencies.txt), and that's the list I'll use in the code.

## other references

Links that might be useful as I'm developing this

* <https://theconversation.com/wordle-the-best-word-to-start-the-game-according-to-a-language-researcher-175114>
* <https://www.reddit.com/r/wordle/comments/s4tcw8/a_note_on_wordles_word_list/>
* <https://www.reddit.com/r/wordle/comments/s88iq4/a_wordle_bot_leaderboard/>
