"use strict";

// === All Shiritori game data and logic lives inside this game object ===
const game = {
    playedWords: [], // stores all the words that have been played in the current round; is reset to empty array upon game reset
    playedWordsCheck: [], // same as above but used for checking dupes (necessary because I learned about uppercase/lowercase Katakana far after writing the code)
    jaCharsToEng: [ // lookup table of Hiragana, Katakana, and associated Romaji; used to generate Romaji
        {ja: "あ", en: "a", ka: "ア"},
        {ja: "い", en: "i", ka: "イ"},
        {ja: "う", en: "u", ka: "ウ"},
        {ja: "え", en: "e", ka: "エ"},
        {ja: "お", en: "o", ka: "オ"},
        {ja: "か", en: "ka", ka: "カ"},
        {ja: "き", en: "ki", ka: "キ", ja2: "ゃ", en2: "kya", ka2: "ャ", ja3: "ゅ", en3: "kyu", ka3: "ュ", ja4: "ょ", en4: "kyo", ka4: "ョ"},
        {ja: "く", en: "ku", ka: "ク"},
        {ja: "け", en: "ke", ka: "ケ"},
        {ja: "こ", en: "ko", ka: "コ"},
        {ja: "さ", en: "sa", ka: "サ"},
        {ja: "し", en: "shi", ka: "シ", ja2: "ゃ", en2: "sha", ka2: "ャ", ja3: "ゅ", en3: "shu", ka3: "ュ", ja4: "ょ", en4: "sho", ka4: "ョ"},
        {ja: "す", en: "su", ka: "ス"},
        {ja: "せ", en: "se", ka: "セ"},
        {ja: "そ", en: "so", ka: "ソ"},
        {ja: "た", en: "ta", ka: "タ"},
        {ja: "ち", en: "chi", ka: "チ", ja2: "ゃ", en2: "cha", ka2: "ャ", ja3: "ゅ", en3: "chu", ka3: "ュ", ja4: "ょ", en4: "cho", ka4: "ョ"},
        {ja: "つ", en: "tsu", ka: "ツ"},
        {ja: "て", en: "te", ka: "テ"},
        {ja: "と", en: "to", ka: "ト"},
        {ja: "な", en: "na", ka: "ナ"},
        {ja: "に", en: "ni", ka: "ニ", ja2: "ゃ", en2: "nya", ka2: "ャ", ja3: "ゅ", en3: "nyu", ka3: "ュ", ja4: "ょ", en4: "nyo", ka4: "ョ"},
        {ja: "ぬ", en: "nu", ka: "ヌ"},
        {ja: "ね", en: "ne", ka: "ネ"},
        {ja: "の", en: "no", ka: "ノ"},
        {ja: "は", en: "ha", ka: "ハ"},
        {ja: "ひ", en: "hi", ka: "ヒ", ja2: "ゃ", en2: "hya", ka2: "ャ", ja3: "ゅ", en3: "hyu", ka3: "ュ", ja4: "ょ", en4: "hyo", ka4: "ョ"},
        {ja: "ふ", en: "fu", ka: "フ"},
        {ja: "へ", en: "he", ka: "ヘ"},
        {ja: "ほ", en: "ho", ka: "ホ"},
        {ja: "ま", en: "ma", ka: "マ"},
        {ja: "み", en: "mi", ka: "ミ", ja2: "ゃ", en2: "mya", ka2: "ャ", ja3: "ゅ", en3: "myu", ka3: "ュ", ja4: "ょ", en4: "myo", ka4: "ョ"},
        {ja: "む", en: "mu", ka: "ム"},
        {ja: "め", en: "me", ka: "メ"},
        {ja: "も", en: "mo", ka: "モ"},
        {ja: "や", en: "ya", ka: "ヤ"},
        {ja: "ゆ", en: "yu", ka: "ユ"},
        {ja: "よ", en: "yo", ka: "ヨ"},
        {ja: "ら", en: "ra", ka: "ラ"},
        {ja: "り", en: "ri", ka: "リ", ja2: "ゃ", en2: "rya", ka2: "ャ", ja3: "ゅ", en3: "ryu", ka3: "ュ", ja4: "ょ", en4: "ryo", ka4: "ョ"},
        {ja: "る", en: "ru", ka: "ル"},
        {ja: "れ", en: "re", ka: "レ"},
        {ja: "ろ", en: "ro", ka: "ロ"},
        {ja: "わ", en: "wa", ka: "ワ"},
        {ja: "ゐ", en: "wi", ka: "ヰ"},
        {ja: "ゑ", en: "we", ka: "ヱ"},
        {ja: "を", en: "wo", ka: "ヲ"},
        {ja: "ん", en: "n", ka: "ン"},
        {ja: "が", en: "ga", ka: "ガ"},
        {ja: "ぎ", en: "gi", ka: "ギ", ja2: "ゃ", en2: "gya", ka2: "ャ", ja3: "ゅ", en3: "gyu", ka3: "ュ", ja4: "ょ", en4: "gyo", ka4: "ョ"},
        {ja: "ぐ", en: "gu", ka: "グ"},
        {ja: "げ", en: "ge", ka: "ゲ"},
        {ja: "ご", en: "go", ka: "ゴ"},
        {ja: "ざ", en: "za", ka: "ザ"},
        {ja: "じ", en: "ji", ka: "ジ", ja2: "ゃ", en2: "ja", ka2: "ャ", ja3: "ゅ", en3: "ju", ka3: "ュ", ja4: "ょ", en4: "jo", ka4: "ョ"},
        {ja: "ず", en: "zu", ka: "ズ"},
        {ja: "ぜ", en: "ze", ka: "ゼ"},
        {ja: "ぞ", en: "zo", ka: "ゾ"},
        {ja: "だ", en: "da", ka: "ダ"},
        {ja: "ぢ", en: "ji", ka: "ヂ", ja2: "ゃ", en2: "ja", ka2: "ャ", ja3: "ゅ", en3: "ju", ka3: "ュ", ja4: "ょ", en4: "jo", ka4: "ョ"},
        {ja: "づ", en: "tzu", ka: "ヅ"},
        {ja: "で", en: "de", ka: "デ"},
        {ja: "ど", en: "do", ka: "ド"},
        {ja: "ば", en: "ba", ka: "バ"},
        {ja: "び", en: "bi", ka: "ビ", ja2: "ゃ", en2: "bya", ka2: "ャ", ja3: "ゅ", en3: "byu", ka3: "ュ", ja4: "ょ", en4: "byo", ka4: "ョ"},
        {ja: "ぶ", en: "bu", ka: "ブ"},
        {ja: "べ", en: "be", ka: "ベ"},
        {ja: "ぼ", en: "bo", ka: "ボ"},
        {ja: "ぱ", en: "pa", ka: "パ"},
        {ja: "ぴ", en: "pi", ka: "ピ", ja2: "ゃ", en2: "pya", ka2: "ャ", ja3: "ゅ", en3: "pyu", ka3: "ュ", ja4: "ょ", en4: "pyo", ka4: "ョ"},
        {ja: "ぷ", en: "pu", ka: "プ"},
        {ja: "ぺ", en: "pe", ka: "ペ"},
        {ja: "ぽ", en: "po", ka: "ポ"}
    ],
    timer: 30, // someday this will get used
    // this enforces a rule of Shiritori:  words cannot be used more than once
    // once this check is passed, it kicks off all the other game logic
    lossReason: 0,  // 0 - no loss, 1 - dupe word, 2 - invalid starting phoneme, 3 - ends with "n" phoneme
    checkRepeatsThenPlay: function(input) {
        if (this.playedWordsCheck.indexOf(this.uppercaseKatakana(input)) !== -1) {
            this.lossReason = 1;
            console.log("Game over:  Repeat detected.");
            alert("Game over:  A word was repeated.");
            this.pushWord(input);
        } else {
            this.pushWord(input);
        }
    },
    // this pushes the played word into the array of already played words, then kicks off the other rules-enforcement logic
    pushWord: function(input) {
        this.playedWords[this.playedWords.length] = input;
        this.playedWordsCheck[this.playedWordsCheck.length] = this.uppercaseKatakana(input);
        
        if (this.lossReason === 1) {
            renderGame();
            this.resetGame();
        } else {
            if ((this.checkValidity() === false || this.checkN() === false) && this.playedWords.length > 1) {
                renderGame();
                this.resetGame();
                // other game over code can go here if we want anything additional to happen upon loss
            } else {
                renderGame();
            }
        }
    },
    // This enforces the main rule of Shiritori:  the last phoneme of prior word must match first phoneme of following word
    // This method will match hiragana and katakana successfully.
    // This function will also consider the following characters to be equivalent:  じ, ぢ, ジ, and ヂ
    checkValidity: function() {
        // helper function:  if input is hiragana, returns corresponding katakana character (and vice versa)
        const lookupCounterpart = input => {
            for (let i = 0; i < this.jaCharsToEng.length; i++) {
                if (input === this.jaCharsToEng[i].ja) {
                    return this.jaCharsToEng[i].ka;
                } else if (input === this.jaCharsToEng[i].ka) {
                    return this.jaCharsToEng[i].ja;
                }

                if (this.jaCharsToEng.ja2) {
                    for (let j = 2; j <= 4; j++) {
                        if (input === this.jaCharsToEng[i][`ja${j}`]) {
                            return this.jaCharsToEng[i][`ka${j}`];
                        } else if (input === this.jaCharsToEng[i][`ka${j}`]) {
                            return this.jaCharsToEng[i][`ja${j}`];
                        }
                    }
                }
            }
        }

        // this logic only makes sense to kick off after more than one word has been played
        // it basically compares the ending of the prior word with the beginning of the following word
        // there are some special cases to account for digraphs and the "ji" phoneme
        if (this.playedWordsCheck.length > 1) {
            const prevEnd1 = this.playedWordsCheck[this.playedWordsCheck.length-2][this.playedWordsCheck[this.playedWordsCheck.length-2].length-1];
            const prevEnd2 = this.playedWordsCheck[this.playedWordsCheck.length-2][this.playedWordsCheck[this.playedWordsCheck.length-2].length-2] + this.playedWordsCheck[this.playedWordsCheck.length-2][this.playedWordsCheck[this.playedWordsCheck.length-2].length-1];
            const prevEndConverted1 = lookupCounterpart(prevEnd1); // this (and the following) variable are specifically to handle Hiragana-Katakana comparisons
            const prevEndConverted2 = lookupCounterpart(prevEnd1) + lookupCounterpart(this.playedWordsCheck[this.playedWordsCheck.length-2][this.playedWordsCheck[this.playedWordsCheck.length-2].length-2]);
            const currentStart1 = this.playedWordsCheck[this.playedWordsCheck.length-1][0];
            const currentStart2 = this.playedWordsCheck[this.playedWordsCheck.length-1][0] + this.playedWordsCheck[this.playedWordsCheck.length-1][1];

            // this handles Hiragana and Katakana digraphs
            if (prevEnd1 === "ゃ" || prevEnd1 === "ゅ" || prevEnd1 === "ょ" || prevEnd1 === "ャ" || prevEnd1 === "ュ" || prevEnd1 === "ョ") {
                if (prevEnd2 === currentStart2 || prevEndConverted2 === currentStart2) {
                    return true;
                }
            // this handles the vast majority of cases
            } else if (prevEnd1 === currentStart1 || prevEndConverted1 === currentStart1) {
                return true;
            // this handles the "ji" phonemes
            } else if (prevEnd1 === "じ" || prevEnd1 === "ぢ" || prevEnd1 === "ジ" || prevEnd1 === "ヂ") {
                if (currentStart1 === "じ" || currentStart1 === "ぢ" || currentStart1 === "ジ" || currentStart1 === "ヂ") {
                    return true;
                }    
            } else if (prevEnd1 === "ず" || prevEnd1 === "づ" || prevEnd1 === "ヅ" || prevEnd1 === "ズ") {
                if (currentStart1 === "ず" || currentStart1 === "づ" || currentStart1 === "ヅ" || currentStart1 === "ズ") {
                    return true;
                }    
            } else {
                this.lossReason = 2;
                console.log("Game over:  New word doesn't start with ending sound of prior word.");
                alert("Game over:  New word didn't start with the ending of the last word.");
                return false; // game over, because the new word doesn't follow the rules
            }
        }
    },
    // this enforces a rule of Shiritori:  words cannot end in ん or ン ("n" sound), as no words begin this way
    checkN: function() {
        if (this.playedWordsCheck[this.playedWordsCheck.length-1][this.playedWordsCheck[this.playedWordsCheck.length-1].length-1] === "ん") {
            this.lossReason = 3;
            console.log("Game over:  Word ends with ん.");
            alert("Game over:  Word ended in ん.");
            return false; // game over, check failed because word ended in ん
        } else if (this.playedWordsCheck[this.playedWordsCheck.length-1][this.playedWordsCheck[this.playedWordsCheck.length-1].length-1] === "ン") {
            this.lossReason = 3;
            console.log("Game over:  Word ends with ン.");
            alert("Game over:  Word ended in ン.");
            return false; // game over, check failed because word ended in ン
        } else {
            return true;
        }
    },
    resetGame: function() {
        this.playedWords.length = 0;
        this.playedWordsCheck.length = 0;
        this.lossReason = 0;
    },
    uppercaseKatakana: function(input) {
        let convertedInput = "";

        // handle lowercase Katakana
        for (let i = 0; i < input.length; i++) {
            if (input[i] === "ァ") {
                convertedInput += "ア";
            } else if (input[i] === "ィ") {
                convertedInput += "イ";
            } else if (input[i] === "ゥ") {
                convertedInput += "ウ";
            } else if (input[i] === "ェ") {
                convertedInput += "エ";
            } else if (input[i] === "ォ") {
                convertedInput += "オ";
            } else {
                convertedInput += input[i];
            }
        }

        return convertedInput;
    }
}

// === and all the code that lives beyond this comment handles anything related to page rendering, DOM manipulation, etc. ===

// Takes Hiragana or Katakana as input and generates Romaji.  Properly handles Sokuon and (for Katakana) Chōonpu
const romanize = function(input) {
    let output = [];
    let containsKatakana = false;

    // iterate through the input string
    for (let i = 0; i < input.length; i++) {
        let syllable = "";
        let found = false

        // iterate through the Hiragana/Katakana lookup table
        for (let j = 0; j < game.jaCharsToEng.length; j++) {
            if (input[i] === game.jaCharsToEng[j].ja) {
                syllable += game.jaCharsToEng[j].en;
                found = true;

                // if the character has associated digraphs, check our input to see if it is a digraph
                if (game.jaCharsToEng[j].ja2) {
                    for (let k = 2; k <= 4; k++) {
                        if (input[i+1] === game.jaCharsToEng[j][`ja${k}`]) {
                            i++;
                            syllable = game.jaCharsToEng[j][`en${k}`];
                            break;
                        }
                    }
                }

                break; // no need to continue the linear search once a match has been found
            }
        }

        // handle Sokuon (っ)
        if (!found && input[i] === "っ") {
            let nextSyllable = "";

            for (let k = 0; k < game.jaCharsToEng.length; k++) {
                if (input[i+1] === game.jaCharsToEng[k].ja) {
                    nextSyllable = game.jaCharsToEng[k].en;
                    break;
                }
            }

            // if the phoneme isn't a "ch" sound, double up the consonant sound of the following syllable
            if (!(nextSyllable[0] === "c" && nextSyllable[1] === "h")) {
                syllable = nextSyllable[0];
            // when writing in Romaji, "ch" sounds are preceded by a "t"
            } else {
                syllable = "t";
            }
        } else if (!found) { // if this branch runs, no hiragana was found.  Assume katakana
            containsKatakana = true;
            break; // breaks out of the hiragana loop
        }

        if (syllable !== "") {
            output[output.length] = syllable;
        }
    }

    // handle Katakana; this is virtually exactly the same logic as the Hiragana loop
    // There's an opportunity to greatly simplify the romanize function by having the Hiragana and Katakana loops share code
    if (containsKatakana) {
        for (let i = 0; i < input.length; i++) {
            let syllable = "";
            let found = false;

            for (let j = 0; j < game.jaCharsToEng.length; j++) {
                if (input[i] === game.jaCharsToEng[j].ka) {
                    syllable += game.jaCharsToEng[j].en;
                    found = true;

                    if (game.jaCharsToEng[j].ka2) {
                        for (let k = 2; k <= 4; k++) {
                            if (input[i+1] === game.jaCharsToEng[j][`ka${k}`]) {
                                i++;
                                syllable = game.jaCharsToEng[j][`en${k}`];
                                break;
                            }
                        }
                    }

                    break;
                }
            }

            // handle Sokuon (ッ)
            if (!found && input[i] === "ッ") {
                let nextSyllable = "";

                for (let k = 0; k < game.jaCharsToEng.length; k++) {
                    if (input[i+1] === game.jaCharsToEng[k].ka) {
                        nextSyllable = game.jaCharsToEng[k].en;
                        break;
                    }
                }

                if (!(nextSyllable[0] === "c" && nextSyllable[1] === "h")) {
                    syllable = nextSyllable[0];
                } else {
                    syllable = "t";
                }
            // handle Chōonpu (ー)
            } else if (!found && input[i] === "ー") {
                const lastLetterOfLastSyllable = output[output.length-1][output[output.length-1].length-1];
                const lastSyllable = output[output.length-1];

                if (lastLetterOfLastSyllable === "a") {
                    output[output.length-1] = lastSyllable.slice(0, lastSyllable.length-1) + "ā";
                } else if (lastLetterOfLastSyllable === "i") {
                    output[output.length-1] = lastSyllable.slice(0, lastSyllable.length-1) + "ī";
                } else if (lastLetterOfLastSyllable === "u") {
                    output[output.length-1] = lastSyllable.slice(0, lastSyllable.length-1) + "ū";
                } else if (lastLetterOfLastSyllable === "e") {
                    output[output.length-1] = lastSyllable.slice(0, lastSyllable.length-1) + "ē";
                } else if (lastLetterOfLastSyllable === "o") {
                    output[output.length-1] = lastSyllable.slice(0, lastSyllable.length-1) + "ō";
                }
            } else if (!found && input[i] === "ァ") { // hacked in logic for lowercase vowel sounds
                syllable = "a";
            } else if (!found && input[i] === "ィ") {
                syllable = "i";
            } else if (!found && input[i] === "ゥ") {
                syllable = "u";
            } else if (!found && input[i] === "ェ") {
                syllable = "e";
            } else if (!found && input[i] === "ォ") {
                syllable = "o";
            }

            if (syllable !== "") {
                output[output.length] = syllable;
            }
        }
    }

    return output;
}

// attached to "Play" button
const submitWord = function() {
    const input = document.getElementById("shiritori");

    if (game.playedWordsCheck.length === 0) {
        renderGame();
    }

    if (input.value.trim() !== "") {
        game.checkRepeatsThenPlay(input.value.trim());
        input.value = "";
    }
}

// attached to text entry box (prevents default; makes enter key only kick off game logic)
const submitOnEnter = function(event) {
    var key = event.charCode || event.keyCode || 0;     
    if (key == 13) {
        event.preventDefault();
        submitWord();
    }
}

// array of objects used to store the last 3 played words
// this way, each word is only processed once, after it was initially played
// we don't have to recompute words; only read them from this array
const lastThreeWords = [
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: "", romanizedWithoutFirstOrLastChar: ""},
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: "", romanizedWithoutFirstOrLastChar: ""},
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: "", romanizedWithoutFirstOrLastChar: ""}
];

// This function and its inner helper functions handle virtually all the DOM manipulation necessary to make the game display
const renderGame = function() {

    // blanks all three word slots
    const resetHTML = function() {
        document.getElementById("slot-0-ja").innerHTML = '<span id="slot-0-ja-last"></span>';
        document.getElementById("slot-0-en").innerHTML = '<span id="slot-0-en-last"></span>';
        document.getElementById("slot-1-ja").innerHTML = '<span id="slot-1-ja-last"></span>';
        document.getElementById("slot-1-en").innerHTML = '<span id="slot-1-en-last"></span>';
        document.getElementById("slot-2-ja").innerHTML = '<span class="" id="slot-2-ja-first"></span><span id="slot-2-ja-middle"></span><span id="slot-2-ja-last"></span>';
        document.getElementById("slot-2-en").innerHTML = '<span class="" id="slot-2-en-first"></span><span id="slot-2-en-middle"></span><span id="slot-2-en-last"></span>';
        document.getElementById("slot-0-meaning").textContent = "";
        document.getElementById("slot-1-meaning").textContent = "";
        document.getElementById("slot-2-meaning").textContent = "";
        document.getElementById("slot-2-ja-first").classList.remove("invalid");
        document.getElementById("slot-2-en-first").classList.remove("invalid");
        document.getElementById("slot-2-ja-middle").classList.remove("invalid");
        document.getElementById("slot-2-en-middle").classList.remove("invalid");
        document.getElementById("slot-2-ja-last").classList.remove("invalid");
        document.getElementById("slot-2-en-last").classList.remove("invalid");
    }

    // reads a word from index slotNum in the lastThreeWords array and renders it onto the page in slot number slotNum
    // slot 0:  used to fade out the previously played word
    // slot 1:  the ending of the word in this slot must match the beginning of the word in slot 2
    // slot 2:  the beginning of the word in this slot must match the ending of the word in slot 1
    const renderHTML = function(slotNum) {
        if (slotNum <= 1) {
            document.getElementById(`slot-${slotNum}-ja`).insertBefore(document.createTextNode(lastThreeWords[slotNum].jaWithoutLastChar), document.getElementById(`slot-${slotNum}-ja-last`));
            document.getElementById(`slot-${slotNum}-ja-last`).textContent = lastThreeWords[slotNum].jaLastChar;
            document.getElementById(`slot-${slotNum}-en`).insertBefore(document.createTextNode(`${lastThreeWords[slotNum].romanizedWithoutLastChar}`), document.getElementById(`slot-${slotNum}-en-last`));
            document.getElementById(`slot-${slotNum}-en-last`).textContent = lastThreeWords[slotNum].romanized[lastThreeWords[slotNum].romanized.length-1];
        } else {
            if (lastThreeWords[slotNum].ja.length > 1) {
                document.getElementById(`slot-${slotNum}-ja-first`).classList.remove("cyan");
                document.getElementById(`slot-${slotNum}-en-first`).classList.remove("cyan");
                document.getElementById(`slot-${slotNum}-ja-first`).textContent = lastThreeWords[slotNum].jaFirstChar;
                document.getElementById(`slot-${slotNum}-ja-middle`).textContent = lastThreeWords[slotNum].jaWithoutFirstOrLastChar;
                document.getElementById(`slot-${slotNum}-ja-last`).textContent = lastThreeWords[slotNum].jaLastChar;
                document.getElementById(`slot-${slotNum}-en-first`).textContent = lastThreeWords[slotNum].romanized[0];
                document.getElementById(`slot-${slotNum}-en-middle`).textContent = lastThreeWords[slotNum].romanizedWithoutFirstOrLastChar;
                document.getElementById(`slot-${slotNum}-en-last`).textContent = lastThreeWords[slotNum].romanized[lastThreeWords[slotNum].romanized.length-1];
            } else {
                document.getElementById(`slot-${slotNum}-ja-first`).textContent = lastThreeWords[slotNum].jaFirstChar;
                document.getElementById(`slot-${slotNum}-en-first`).textContent = lastThreeWords[slotNum].romanized[0];
                document.getElementById(`slot-${slotNum}-ja-first`).classList.add("cyan");
                document.getElementById(`slot-${slotNum}-en-first`).classList.add("cyan");
            }
            
            if (game.lossReason === 1) {
                console.log("lossReason: ", game.lossReason);
                document.getElementById("slot-2-ja-first").classList.add("invalid");
                document.getElementById("slot-2-en-first").classList.add("invalid");
                document.getElementById("slot-2-ja-middle").classList.add("invalid");
                document.getElementById("slot-2-en-middle").classList.add("invalid");
                document.getElementById("slot-2-ja-last").classList.add("invalid");
                document.getElementById("slot-2-en-last").classList.add("invalid");
            } else if (game.lossReason === 2) {
                console.log("lossReason: ", game.lossReason);
                document.getElementById("slot-2-ja-first").classList.add("invalid");
                document.getElementById("slot-2-en-first").classList.add("invalid");
            } else if (game.lossReason === 3) {
                console.log("lossReason: ", game.lossReason);
                if (lastThreeWords[slotNum].ja.length > 1) {
                    document.getElementById("slot-2-ja-last").classList.add("invalid");
                    document.getElementById("slot-2-en-last").classList.add("invalid");
                } else {
                    document.getElementById("slot-2-ja-first").classList.add("invalid");
                    document.getElementById("slot-2-en-first").classList.add("invalid");
                }
            }
        }
        document.getElementById(`slot-${slotNum}-meaning`).textContent = lastThreeWords[slotNum].meaning;
    }

    // reads the last word in the game.playedWords array and saves it to the lastThreeWords array in index slotNum
    // handles all the character manipulation necessary to make the game work
    const saveToSlot = function(slotNum) {

        // look up the played word to see if it lives in our (extremely limited) dictionary file.
        // if it does, we can show the English meaning of the word
        const lookupMeaning = function() {
            let found = false;
            for (let i = 0; i < dictionary.length; i++) {
                if (lastThreeWords[slotNum].ja === dictionary[i].ja) {
                    lastThreeWords[slotNum].meaning = dictionary[i].en;
                    found = true;
                    break;
                }
            }
    
            if (!found) {
                lastThreeWords[slotNum].meaning = "";
            }
        }

        lastThreeWords[slotNum].ja = game.playedWords[game.playedWords.length - 1]; // save the Hiragana/Katakana
        lastThreeWords[slotNum].romanized = romanize(lastThreeWords[slotNum].ja); // save the associated Romaji

        // Saves the Romaji without the first and last phonemes as strings.  Each phoneme is separated by " • "
        if (lastThreeWords[slotNum].romanized.length === 1) {
            lastThreeWords[slotNum].romanizedWithoutFirstChar = "";
            lastThreeWords[slotNum].romanizedWithoutLastChar = "";
            lastThreeWords[slotNum].romanizedWithoutFirstOrLastChar = "";
        } else {
            lastThreeWords[slotNum].romanizedWithoutFirstChar = " • " + lastThreeWords[slotNum].romanized.slice(1).join(" • ");
            lastThreeWords[slotNum].romanizedWithoutLastChar = lastThreeWords[slotNum].romanized.slice(0, -1).join(" • ") + " • ";
            if (lastThreeWords[slotNum].romanized.slice(1, -1).join(" • ") === "") {
                lastThreeWords[slotNum].romanizedWithoutFirstOrLastChar = " • ";
            } else {
                lastThreeWords[slotNum].romanizedWithoutFirstOrLastChar = " • " + lastThreeWords[slotNum].romanized.slice(1, -1).join(" • ") + " • ";
            }
        }

        // Same as above for the Hiragana or Katakana, but without the " • " in between each phoneme
        if (lastThreeWords[slotNum].ja.length === 1) {
            lastThreeWords[slotNum].jaWithoutFirstChar = "";
            lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja;
            lastThreeWords[slotNum].jaWithoutLastChar = "";
            lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja;
            lastThreeWords[slotNum].jaWithoutFirstOrLastChar = "";
        } else {
            // special case logic for digraphs (as digraphs use 2 characters to represent a phoneme)
            // this is for the first phoneme
            if (lastThreeWords[slotNum].ja[1] === "ゃ" || lastThreeWords[slotNum].ja[1] === "ゅ" || lastThreeWords[slotNum].ja[1] === "ょ" || lastThreeWords[slotNum].ja[1] === "ャ" || lastThreeWords[slotNum].ja[1] === "ュ" || lastThreeWords[slotNum].ja[1] === "ョ") {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(2);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0] + lastThreeWords[slotNum].ja[1];
            } else {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(1);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0];
            }
            // and this is for the last phoneme
            if (lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゃ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゅ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ょ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ャ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ュ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ョ") {
                lastThreeWords[slotNum].jaWithoutLastChar = lastThreeWords[slotNum].ja.slice(0, -2);
                lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-2] + lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1];
            } else {
                lastThreeWords[slotNum].jaWithoutLastChar = lastThreeWords[slotNum].ja.slice(0, -1);
                lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1];
            }
            // both first and last phonemes
            if (lastThreeWords[slotNum].ja[1] === "ゃ" || lastThreeWords[slotNum].ja[1] === "ゅ" || lastThreeWords[slotNum].ja[1] === "ょ" || lastThreeWords[slotNum].ja[1] === "ャ" || lastThreeWords[slotNum].ja[1] === "ュ" || lastThreeWords[slotNum].ja[1] === "ョ") {
                lastThreeWords[slotNum].jaWithoutFirstOrLastChar = lastThreeWords[slotNum].jaWithoutLastChar.slice(2);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0] + lastThreeWords[slotNum].ja[1];
            } else {
                lastThreeWords[slotNum].jaWithoutFirstOrLastChar = lastThreeWords[slotNum].jaWithoutLastChar.slice(1);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0];
            }
        }

        lookupMeaning();
    }

    if (game.playedWords.length === 0) {
        resetHTML(); // blank the page

        // blank the lastThreeWords array
        for (let i = 0; i < lastThreeWords.length; i++) {
            const keys = Object.keys(lastThreeWords[i]);
            for (let j = 0; j < keys.length; j++) {
                // I am aware that my code mutates type, as key romanized is intended to hold an array
                // I am also aware that this is suboptimal and incurs a performance penalty
                lastThreeWords[i][keys[j]] = "";
            }
        }

        document.getElementById("slot-0").classList.remove("fadeIn", "translateFadeOut");
        document.getElementById("slot-1").classList.remove("fadeIn", "translate");
        document.getElementById("slot-2").classList.remove("fadeIn", "translateFadeIn");
    // render first word to slot 1 with a fade in
    } else if (game.playedWords.length === 1) {
        saveToSlot(1);
        renderHTML(1);

        void document.getElementById("slot-1").offsetWidth;
        document.getElementById("slot-1").classList.add("fadeIn");
    // render second word to slot 2 with a fade in
    } else if (game.playedWords.length === 2){
        saveToSlot(2);
        renderHTML(2);

        document.getElementById("slot-2").classList.add("fadeIn");
    // for all subsequent turns, slot 0 slides left and fades out, slot 1 slides left, and slot 2 slides left and fades in
    } else {
        // ugh JavaScript why (this is a manual shifting of the array to the left, but I don't want the array indices to reference the objects)
        lastThreeWords[0] = JSON.parse(JSON.stringify(lastThreeWords[1]));
        lastThreeWords[1] = JSON.parse(JSON.stringify(lastThreeWords[2]));

        document.getElementById("slot-0").classList.remove("fadeIn", "translateFadeOut");
        document.getElementById("slot-1").classList.remove("fadeIn", "translate");
        document.getElementById("slot-2").classList.remove("fadeIn", "translateFadeIn");

        resetHTML();
        saveToSlot(2);
        renderHTML(0);
        renderHTML(1);
        renderHTML(2);

        // not happy about this hack...  (this makes CSS animations always play for words 3 and greater)
        void document.getElementById("slot-0").offsetWidth;
        void document.getElementById("slot-1").offsetWidth;
        void document.getElementById("slot-2").offsetWidth;
        document.getElementById("slot-0").classList.add("translateFadeOut");
        document.getElementById("slot-1").classList.add("translate");
        document.getElementById("slot-2").classList.add("translateFadeIn");
    }
}