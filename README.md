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

If you're going to dig into the code... (section last updated 2018-08-22)
---------------------------------------

`shiritori.js` is a `"strict mode";` script, and is roughly divided into two parts.  The first part consists of the `game` object that handles the Shiritori game logic, and the second part is a bunch of functions and function calls that are responsible for the visual aspects of the game (DOM manipulation, rendering to the page, etc.)  Note that the Romaji generation logic lives mostly with the 2nd half, but relies on the lookup table inside the game object.  Oops.

__The `game` object__:  responsible for the Shiritori game logic (handles the rules of the game).  Also holds the Hiragana and Katakana lookup table.
* `game.playedWords`:  an array that holds the words that the player(s) have used in the current round.  Is reset to `[]` upon loss.
* `game.playedWordsCheck`:  same as above, but used to actually perform the rules checking.  This array holds the same words as the above array, but lowercase Katakana vowels are changed to uppercase first.  Is also reset to `[]` upon loss.
* `game.jaCharsToEnglish`:  this is the Hiragana and Katakana lookup table.
* `game.timer`:  defaults to 30 and is currently unused.  The idea is that once the game has started, the player(s) will be given 30 seconds to enter a word.
* `game.lossReason`:  logs the reason that the round ended.
    * `0`:  Situation normal!
    * `1`:  Player attempted to play a duplicate word.
    * `2`:  Player attempted to play a word that does not start with the phoneme that matches the ending phoneme of the prior word.
    * `3`:  Player attempted to play a word that ends with the "n" (Hiragana: ん, Katakana: ン) phoneme.
* `game.checkRepeatsThenPlay(input)`:  One of the rules of Shiritori is that a word can't be used twice.  This method checks the `game.playedWordsCheck` array to see if a word already exists there.  If it does, `game.lossReason` is set to 1, `game.pushWord` is called so that the game can render the losing word, then the game is eventually reset.  Otherwise, the word is accepted for play and this method calls `game.pushWord(input)`.  This method depends on `game.uppercaseKatakana` to perform its uppercase conversion, as I noticed that the built-in JavaScript `string.toUpperCase` and `string.toLocaleUpperCase` methods weren't working for me in Firefox (though my computer is in the en-us locale).
* `game.pushWord(input)`:  if `game.lossReason === 1`, the game is rendered and then reset.  Otherwise, this method calls `game.checkValidity()` and `game.checkN()`.  If either of those fail and we are on the 2nd or later word to be played, the game is over.  Otherwise, the game continues.
* `game.checkValidity()`:  This method checks to make sure the starting phoneme of the just-played word matches the ending phoneme of the prior word.
    * inner function `lookupCounterpart`:  arrow function to take advantage of implicit `bind(this)` or `var that = this`.  For a given Hiragana character, this helper function looks up the corresponding Katakana (and vice versa).
    * The additional logic you see in the `checkValidity` method handles [Japanese digraphs](https://en.wikipedia.org/wiki/Y%C5%8Don), as some phonemes are written with two characters.
* `game.checkN()`:  This checks to see if the submitted word ends in an "n" sound (ん, ン).  As no Japanese words start with this sound, the round ends.
* `game.resetGame()`:  This merely resets the variables inside the game object that hold data about the current round, namely `playedWords`, `playedWordsCheck`, and `lossReason`.
* `game.uppercaseKatakana(input)`:  This converts the lowercase Katakana vowels to their uppercase counterparts.  This is needed to catch duplicates.

__The DOM manipulation code__ (and Romaji-generation code):

* `romanize(input)`:  Takes `input`, which is either Hiragana or Katakana and outputs Romaji.  Scans through and assumes Hiragana first.  If no Hiragana is detected, switches to Katakana.  The additional logic present in this function handles some irregularities of the language.
* `submitWord()`:  Kicks off the game logic when the "Play!" button is clicked.  Reads the value of the inputted word by taking the trimmed value of the text entry box.
* `submitOnEnter()`:  Kicks off the game logic when the enter button is pressed, assuming the text box is currently active.  Prevents default (form submission).
* `lastThreeWords`:  Array that holds the last three words (along with various versions of those words) that have been played.  This array is used to draw the words to the page.
* `renderGame()`:  Way-too-bulky function that handles all the drawing to the page.  There are three slots where words can be drawn.  Slot 0 is used only for fading out the oldest word.  Slot 1 holds the word from two turns ago.  Slot 2 holds the word that was just played, which is the word that must be followed up upon.
    * `resetHTML()`:  Helper function that blanks all three slots on the page.
    * `renderHTML(slotNum)`:  slotNum can be 0, 1, or 2.  Causes the appropriate word to be rendered into the targeted slot.  Also handles applying the correct classes if the just-played word was one phoneme long or if a losing word was played (checks for `game.lossReason` being `1`, `2`, or `3` with appropriate logic for each).
    * `saveToSlot(slotNum)`:  reads from `game.playedWords`, generates all the necessary variations, and saves that data to the targeted index of the `lastThreeWords` array.
        * `lookupMeaning()`:  Performs a linear search through the `dictionary.js` file for the English meaning of the inputted word.  `dictionary.js` is extremely limited, and just exists as part of a stubbed-out feature.
    * The remainder of the logic actually places the words onto the page.
        * If no words have been played, the page and `lastThreeWords` array are reset.
        * If the first word has been played, it is rendered to `slot-1` with a fade in effect.
        * If the second word has been played, it is rendered to `slot-2` with a fade in effect.
        * The third and subsequent words are rendered into `slot-2` with a translate and fade in effect.
            * The word that was in `slot-1` is moved into `slot-0` with a translate and fade out effect.
            * The word that was in `slot-2` is moved into `slot-1` with a translate effect.
        * All animations are done in CSS by applying the appropriate classes.  I use the `void document.element.offsetWidth;` hack to cause the animation to be played as necessary.  I am aware this is not ideal, as each time it is used, it forces the page to be reflowed.