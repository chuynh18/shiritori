[Shiritori](https://chuynh18.github.io/shiritori/)
=========

A [Japanese rhyming game](https://en.wikipedia.org/wiki/Shiritori).  This is just a proof-of-concept and is missing a lot of required features.

**Project in collaboration with [cliffpham](https://github.com/cliffpham).**

![gameplay snippet](assets/img/example.gif)

Features
--------
* A very limited Japanese dictionary.  If the game recognizes the word you've used, it will show the meaning of that word in English.
* Matching logic properly matches across both Hiragana and Katakana words.  (You can follow a Hiragana word with a Katakana word and vice versa.)
* Automatically romanizes Hiragana and Katakana.  Handles [Sokuon](https://en.wikipedia.org/wiki/Sokuon) and (for Katakana) [Chōonpu](https://en.wikipedia.org/wiki/Ch%C5%8Donpu).
* Highlights the phonemes that must match (last phoneme of leading word, first phoneme of following word).
    * Highlighting properly handles [digraphs](https://en.wikipedia.org/wiki/Y%C5%8Don).
* Simple transition animations to help make the flow and rules of the game more obvious.
* The page should display just fine on mobile devices.

Limitations
-----------

As mentioned, this is simply a proof-of-concept.  Known limitations are:
* Does not actually know what words are actual Japanese words, as I don't have access to a good Japanese dictionary file
    * So it won't limit you to just nouns (but of course...  it can't distinguish between real words and gibberish)
* Text entry box is not restricted to only Japanese characters
  
This is merely a proof-of-concept (turning this into a real product would require access to a comprehensive Japanese dictionary file), and there may be bugs.  That being said, the core logic exists!

If you're going to dig into the code...
---------------------------------------

`shiritori.js` is a `"strict mode";` script, and is roughly divided into two parts.  The first part consists of the `game` object that handles the Shiritori game logic, and the second part is a bunch of functions and function calls that are responsible for the visual aspects of the game (DOM manipulation, rendering to the page, etc.)  Note that the Romaji generation logic lives mostly with the 2nd half, but relies on the lookup table inside the game object.  Oops.

The `game` object:  responsible for the Shiritori game logic (handles the rules of the game).  Also holds the Hiragana and Katakana lookup table.
* `game.playedWords`:  an array that holds the words that the player(s) have used in the current round.  Is reset to `[]` upon loss.
* `game.playedWordsCheck`:  same as above, but used to actually perform the rules checking.  This array holds the same words as the above array, but lowercase Katakana vowels are changed to uppercase first.  Is also reset to `[]` upon loss.
* `game.jaCharsToEnglish`:  this is the Hiragana and Katakana lookup table.
* `game.timer`:  defaults to 30 and is currently unused.  The idea is that once the game has started, the player(s) will be given 30 seconds to enter a word.
* `game.lossReason`:  logs the reason that the round ended.
    * `0`:  Situation normal!
    * `1`:  Player attempted to play a duplicate word.
    * `2`:  Player attempted to play a word that does not start with the phoneme that matches the ending phoneme of the prior word.
    * `3`:  Player attempted to play a word that ends with the "n" (Hiragana: ん, Katakana: ン) phoneme.
* `game.checkRepeatsThenPlay`:  One of the rules of Shiritori is that a word can't be used twice.  This method checks the `game.playedWordsCheck` array to see if a word already exists there.  If it does, `game.lossReason` is set to 1, `game.pushWord` is called so that the game can render the losing word, then the game is eventually reset.  Otherwise, the word is accepted for play and this method calls `game.pushWord(input)`.  This method depends on `game.uppercaseKatakana` to perform its uppercase conversion, as I noticed that the built-in JavaScript `string.toUpperCase` and `string.toLocaleUpperCase` methods weren't working for me in Firefox (though my computer is in the en-us locale).
* `game.pushWord`:  if `game.lossReason === 1`, the game is rendered and then reset.  Otherwise, this method calls `game.checkValidity()` and `game.checkN()`.  If either of those fail and we are on the 2nd or later word to be played, the game is over.  Otherwise, the game continues.
* `game.checkValidity`:  This method checks to make sure the starting phoneme of the just-played word matches the ending phoneme of the prior word.
    * inner function `lookupCounterpart`:  arrow function to take advantage of implicit `bind(this)` or `var that = this`.  For a given Hiragana character, this helper function looks up the corresponding Katakana (and vice versa).
    * The additional logic you see in the `checkValidity` method handles [Japanese digraphs](https://en.wikipedia.org/wiki/Y%C5%8Don), as some phonemes are written with two characters.
* `game.checkN`:  This checks to see if the submitted word ends in an "n" sound (ん, ン).  As no Japanese words start with this sound, the round ends.
* `game.resetGame`:  This merely resets the variables inside the game object that hold data about the current round, namely `playedWords`, `playedWordsCheck`, and `lossReason`.
* `game.uppercaseKatakana`:  This converts the lowercase Katakana vowels to their uppercase counterparts.  This is needed to catch duplicates.