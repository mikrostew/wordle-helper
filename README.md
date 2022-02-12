# wordle-helper

Show some possible words for [Wordle](https://www.powerlanguage.co.uk/wordle/), based on guesses so far.

## word lists

I wrote a script ([download-word-lists](./scripts/download-word-lists.js)) to parse the word lists from the Wordle source code, based on [this Reddit post](https://www.reddit.com/r/wordle/comments/s4tcw8/a_note_on_wordles_word_list/). To update the word list, just run

```bash
$ yarn download-words
```
