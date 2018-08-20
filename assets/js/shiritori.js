"use strict";

// === All Shiritori game data and logic lives inside this game object ===
const game = {
    playedWords: [],
    jaCharsToEng: [
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
    checkRepeatsThenPlay: function(input) {
        if (this.playedWords.indexOf(input) !== -1) {
            console.log("Game over:  Repeat detected.");
            alert("Game over:  A word was repeated.");
            this.resetGame();
        } else {
            this.pushWord(input);
        }
    },
    pushWord: function(input) {
        this.playedWords[this.playedWords.length] = input;
        if ((this.checkValidity() === false || this.checkN() === false) && this.playedWords.length > 1) {
            this.resetGame();
            // other game over code here
        }
    },
    // This enforces the rules of Shiritori:  the last phoneme of prior word must match first phoneme of following word
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

        if (this.playedWords.length > 1) {
            const prevEnd1 = this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-1];
            const prevEnd2 = this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-2] + this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-1];
            const prevEndConverted1 = lookupCounterpart(prevEnd1);
            const prevEndConverted2 = lookupCounterpart(prevEnd1) + lookupCounterpart(this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-2]);
            const currentStart1 = this.playedWords[this.playedWords.length-1][0];
            const currentStart2 = this.playedWords[this.playedWords.length-1][0] + this.playedWords[this.playedWords.length-1][1];

            if (prevEnd1 === "ゃ" || prevEnd1 === "ゅ" || prevEnd1 === "ょ" || prevEnd1 === "ャ" || prevEnd1 === "ュ" || prevEnd1 === "ョ") {
                if (prevEnd2 === currentStart2 || prevEndConverted2 === currentStart2) {
                    return true;
                }
            } else if (prevEnd1 === currentStart1 || prevEndConverted1 === currentStart1) {
                return true;
            } else if (prevEnd1 === "じ" || prevEnd1 === "ぢ" || prevEnd1 === "ジ" || prevEnd1 === "ヂ") {
                if (currentStart1 === "じ" || currentStart1 === "ぢ" || currentStart1 === "ジ" || currentStart1 === "ヂ") {
                    return true;
                }
            } else {
                console.log("Game over:  New word doesn't start with ending sound of prior word.");
                alert("Game over:  New word didn't start with the ending of the last word.");
                return false; // game over, because the new word doesn't follow the rules
            }
        }
    },
    checkN: function() {
        if (this.playedWords[this.playedWords.length-1][this.playedWords[this.playedWords.length-1].length-1] === "ん") {
            console.log("Game over:  Word ends with ん.");
            alert("Game over:  Word ended in ん.");
            return false; // game over, check failed because word ended in ん
        } else if (this.playedWords[this.playedWords.length-1][this.playedWords[this.playedWords.length-1].length-1] === "ン") {
            console.log("Game over:  Word ends with ン.");
            alert("Game over:  Word ended in ン.");
            return false; // game over, check failed because word ended in ン
        } else {
            return true;
        }
    },
    resetGame: function() {
        this.playedWords.length = 0;
    }
}

// === and all the code that lives beyond this comment handles anything related to page rendering, DOM manipulation, etc. ===

// Takes Hiragana or Katakana as input and generates Romaji.  Properly handles Sokuon and (for Katakana) Chōonpu
const romanize = function(input) {
    let output = [];
    let containsKatakana = false;

    for (let i = 0; i < input.length; i++) {
        let syllable = "";
        let found = false

        for (let j = 0; j < game.jaCharsToEng.length; j++) {
            if (input[i] === game.jaCharsToEng[j].ja) {
                syllable += game.jaCharsToEng[j].en;
                found = true;

                if (game.jaCharsToEng[j].ja2) {
                    for (let k = 2; k <= 4; k++) {
                        if (input[i+1] === game.jaCharsToEng[j][`ja${k}`]) {
                            i++;
                            syllable = game.jaCharsToEng[j][`en${k}`];
                            break;
                        }
                    }
                }

                break;
            }
        }

        // handle sokuon っ
        if (!found && input[i] === "っ") {
            let nextSyllable = "";

            for (let k = 0; k < game.jaCharsToEng.length; k++) {
                if (input[i+1] === game.jaCharsToEng[k].ja) {
                    nextSyllable = game.jaCharsToEng[k].en;
                    break;
                }
            }

            if (!(nextSyllable[0] === "c" && nextSyllable[1] === "h")) {
                syllable = nextSyllable[0];
            } else {
                syllable = "t";
            }
        } else if (!found) { // if this branch runs, no hiragana was found.  Assume katakana
            containsKatakana = true;
            break;
        }

        if (syllable !== "") {
            output[output.length] = syllable;
        }
    }

    // handle katakana
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

            // handle sokuon ッ
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

const submitWord = function() {
    const input = document.getElementById("shiritori");

    if (input.value.trim() !== "") {
        game.checkRepeatsThenPlay(input.value.trim());
        input.value = "";
        renderGame();
    }
}

const submitOnEnter = function(event) {
    var key = event.charCode || event.keyCode || 0;     
    if (key == 13) {
        event.preventDefault();
        submitWord();
    }
}

const lastThreeWords = [
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: ""},
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: ""},
    {ja: "", jaFirstChar: "", jaLastChar:"", jaWithoutFirstChar: "", jaWithoutLastChar: "", meaning: "", romanized: "", romanizedWithoutLastChar: "", romanizedWithoutFirstChar: ""}
];

const renderGame = function() {

    const resetHTML = function() {
        document.getElementById("slot-1-ja").innerHTML = '<span id="slot-1-ja-last"></span>';
        document.getElementById("slot-1-en").innerHTML = '<span id="slot-1-en-last"></span>';
        document.getElementById("slot-2-ja").innerHTML = '<span id="slot-2-ja-first"></span>';
        document.getElementById("slot-2-en").innerHTML = '<span id="slot-2-en-first"></span>';
        document.getElementById("slot-0-ja").innerHTML = '<span id="slot-0-ja-last"></span>';
        document.getElementById("slot-0-en").innerHTML = '<span id="slot-0-en-last"></span>';
        document.getElementById("slot-0-meaning").textContent = "";
        document.getElementById("slot-1-meaning").textContent = "";
        document.getElementById("slot-2-meaning").textContent = "";
    }

    const renderHTML = function(slotNum) {
        if (slotNum <= 1) {
            document.getElementById(`slot-${slotNum}-ja`).insertBefore(document.createTextNode(lastThreeWords[slotNum].jaWithoutLastChar), document.getElementById(`slot-${slotNum}-ja-last`));
            document.getElementById(`slot-${slotNum}-ja-last`).textContent = lastThreeWords[slotNum].jaLastChar;
            document.getElementById(`slot-${slotNum}-en`).insertBefore(document.createTextNode(`${lastThreeWords[slotNum].romanizedWithoutLastChar}`), document.getElementById(`slot-${slotNum}-en-last`));
            document.getElementById(`slot-${slotNum}-en-last`).textContent = `${lastThreeWords[slotNum].romanized[lastThreeWords[slotNum].romanized.length-1]}`;
        } else {
            document.getElementById(`slot-${slotNum}-ja-first`).textContent = lastThreeWords[2].jaFirstChar;
            document.getElementById(`slot-${slotNum}-ja`).appendChild(document.createTextNode(lastThreeWords[2].jaWithoutFirstChar));
            document.getElementById(`slot-${slotNum}-en`).appendChild(document.createTextNode(lastThreeWords[2].romanizedWithoutFirstChar));
            document.getElementById(`slot-${slotNum}-en-first`).textContent = lastThreeWords[2].romanized[0];
        }
        document.getElementById(`slot-${slotNum}-meaning`).textContent = lastThreeWords[slotNum].meaning;
    }

    const saveToSlot = function(slotNum) {
        lastThreeWords[slotNum].ja = game.playedWords[game.playedWords.length - 1];
        lastThreeWords[slotNum].romanized = romanize(lastThreeWords[slotNum].ja);
        if (lastThreeWords[slotNum].romanized.length === 1) {
            lastThreeWords[slotNum].romanizedWithoutFirstChar = "";
            lastThreeWords[slotNum].romanizedWithoutLastChar = "";
        } else {
            lastThreeWords[slotNum].romanizedWithoutFirstChar = " • " + lastThreeWords[slotNum].romanized.slice(1).join(" • ");
            lastThreeWords[slotNum].romanizedWithoutLastChar = lastThreeWords[slotNum].romanized.slice(0, -1).join(" • ") + " • ";
        }

        if (lastThreeWords[slotNum].ja.length === 1) {
            lastThreeWords[slotNum].jaWithoutFirstChar = "";
            lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja;
            lastThreeWords[slotNum].jaWithoutLastChar = "";
            lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja;
        } else {
            if (lastThreeWords[slotNum].ja[1] === "ゃ" || lastThreeWords[slotNum].ja[1] === "ゅ" || lastThreeWords[slotNum].ja[1] === "ょ" || lastThreeWords[slotNum].ja[1] === "ャ" || lastThreeWords[slotNum].ja[1] === "ュ" || lastThreeWords[slotNum].ja[1] === "ョ") {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(2);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0] + lastThreeWords[slotNum].ja[1];
            } else {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(1);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0];
            }

            if (lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゃ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゅ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ょ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ャ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ュ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ョ") {
                lastThreeWords[slotNum].jaWithoutLastChar = lastThreeWords[slotNum].ja.slice(0, -2);
                lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-2] + lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1];
            } else {
                lastThreeWords[slotNum].jaWithoutLastChar = lastThreeWords[slotNum].ja.slice(0, -1);
                lastThreeWords[slotNum].jaLastChar = lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1];
            }
        }

        for (let i = 0; i < dictionary.length; i++) {
            let found = false;
            if (lastThreeWords[slotNum].ja === dictionary[i].ja) {
                lastThreeWords[slotNum].meaning = dictionary[i].en;
                found = true;
                break;
            }

            if (!found) {
                lastThreeWords[slotNum].meaning = "";
            }
        }
    }

    if (game.playedWords.length === 0) {
        resetHTML();

        for (let i = 0; i < lastThreeWords.length; i++) {
            const keys = Object.keys(lastThreeWords[i]);
            for (let j = 0; j < keys.length; j++) {
                lastThreeWords[i][keys[j]] = "";
            }
        }

        document.getElementById("slot-0").classList.remove("fadeIn", "translateFadeOut");
        document.getElementById("slot-1").classList.remove("fadeIn", "translate");
        document.getElementById("slot-2").classList.remove("fadeIn", "translateFadeIn");
    } else if (game.playedWords.length === 1) {
        saveToSlot(1);
        renderHTML(1);

        document.getElementById("slot-1").classList.add("fadeIn");

    } else if (game.playedWords.length === 2){
        saveToSlot(2);
        renderHTML(2);

        document.getElementById("slot-2").classList.add("fadeIn");
    } else {
        // ugh javascript why
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

        // not happy about this hack...
        void document.getElementById("slot-0").offsetWidth;
        void document.getElementById("slot-1").offsetWidth;
        void document.getElementById("slot-2").offsetWidth;
        document.getElementById("slot-0").classList.add("translateFadeOut");
        document.getElementById("slot-1").classList.add("translate");
        document.getElementById("slot-2").classList.add("translateFadeIn");
    }
}