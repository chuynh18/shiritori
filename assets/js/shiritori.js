"use strict";

const game = {
    playedWords: [],
    jaCharsToEng: [
        {ja: "あ", en: "a"},
        {ja: "い", en: "i"},
        {ja: "う", en: "u"},
        {ja: "え", en: "e"},
        {ja: "お", en: "o"},
        {ja: "か", en: "ka"},
        {ja: "き", en: "ki", ja2: "ゃ", en2: "kya", ja3: "ゅ", en3: "kyu", ja4: "ょ", en4: "kyo"},
        {ja: "く", en: "ku"},
        {ja: "け", en: "ke"},
        {ja: "こ", en: "ko"},
        {ja: "さ", en: "sa"},
        {ja: "し", en: "shi", ja2: "ゃ", en2: "sha", ja3: "ゅ", en3: "shu", ja4: "ょ", en4: "sho"},
        {ja: "す", en: "su"},
        {ja: "せ", en: "se"},
        {ja: "そ", en: "so"},
        {ja: "た", en: "ta"},
        {ja: "ち", en: "chi", ja2: "ゃ", en2: "cha", ja3: "ゅ", en3: "chu", ja4: "ょ", en4: "cho"},
        {ja: "つ", en: "tsu"},
        {ja: "て", en: "te"},
        {ja: "と", en: "to"},
        {ja: "な", en: "na"},
        {ja: "に", en: "ni", ja2: "ゃ", en2: "nya", ja3: "ゅ", en3: "nyu", ja4: "ょ", en4: "nyo"},
        {ja: "ぬ", en: "nu"},
        {ja: "ね", en: "ne"},
        {ja: "の", en: "no"},
        {ja: "は", en: "ha"},
        {ja: "ひ", en: "hi", ja2: "ゃ", en2: "hya", ja3: "ゅ", en3: "hyu", ja4: "ょ", en4: "hyo"},
        {ja: "ふ", en: "fu"},
        {ja: "へ", en: "he"},
        {ja: "ほ", en: "ho"},
        {ja: "ま", en: "ma"},
        {ja: "み", en: "mi", ja2: "ゃ", en2: "mya", ja3: "ゅ", en3: "myu", ja4: "ょ", en4: "myo"},
        {ja: "む", en: "mu"},
        {ja: "め", en: "me"},
        {ja: "も", en: "mo"},
        {ja: "や", en: "ya"},
        {ja: "ゆ", en: "yu"},
        {ja: "よ", en: "yo"},
        {ja: "ら", en: "ra", ja2: "ゃ", en2: "rya", ja3: "ゅ", en3: "ryu", ja4: "ょ", en4: "ryo"},
        {ja: "り", en: "ri"},
        {ja: "る", en: "ru"},
        {ja: "れ", en: "re"},
        {ja: "ろ", en: "ro"},
        {ja: "わ", en: "wa"},
        {ja: "ゐ", en: "wi"},
        {ja: "ゑ", en: "we"},
        {ja: "を", en: "wo"},
        {ja: "ん", en: "n"},
        {ja: "が", en: "ga"},
        {ja: "ぎ", en: "gi", ja2: "ゃ", en2: "gya", ja3: "ゅ", en3: "gyu", ja4: "ょ", en4: "gyo"},
        {ja: "ぐ", en: "gu"},
        {ja: "げ", en: "ge"},
        {ja: "ご", en: "go"},
        {ja: "ざ", en: "za"},
        {ja: "じ", en: "ji", ja2: "ゃ", en2: "ja", ja3: "ゅ", en3: "ju", ja4: "ょ", en4: "jo"},
        {ja: "ず", en: "zu"},
        {ja: "ぜ", en: "ze"},
        {ja: "ぞ", en: "zo"},
        {ja: "だ", en: "da"},
        {ja: "ぢ", en: "ji", ja2: "ゃ", en2: "ja", ja3: "ゅ", en3: "ju", ja4: "ょ", en4: "jo"},
        {ja: "づ", en: "tzu"},
        {ja: "で", en: "de"},
        {ja: "ど", en: "do"},
        {ja: "ば", en: "ba"},
        {ja: "び", en: "bi", ja2: "ゃ", en2: "bya", ja3: "ゅ", en3: "byu", ja4: "ょ", en4: "byo"},
        {ja: "ぶ", en: "bu"},
        {ja: "べ", en: "be"},
        {ja: "ぼ", en: "bo"},
        {ja: "ぱ", en: "pa"},
        {ja: "ぴ", en: "pi", ja2: "ゃ", en2: "pya", ja3: "ゅ", en3: "pyu", ja4: "ょ", en4: "pyo"},
        {ja: "ぷ", en: "pu"},
        {ja: "ぺ", en: "pe"},
        {ja: "ぽ", en: "po"}
    ],
    timer: 30,
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
    checkValidity: function() {
        if (this.playedWords.length > 1) {
            const prevEnd1 = this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-1];
            const prevEnd2 = this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-2] + this.playedWords[this.playedWords.length-2][this.playedWords[this.playedWords.length-2].length-1];
            const currentStart1 = this.playedWords[this.playedWords.length-1][0];
            const currentStart2 = this.playedWords[this.playedWords.length-1][0] + this.playedWords[this.playedWords.length-1][1];

            if (prevEnd1 === "ゃ" || prevEnd1 === "ゅ" || prevEnd1 === "ょ") {
                if (prevEnd2 === currentStart2) {
                    return true;
                }
            } else if (prevEnd1 === currentStart1) {
                return true;
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
        } else {
            return true;
        }
    },
    resetGame: function() {
        this.playedWords.length = 0;
    },
    romanize: function(input) {
        let output = [];

        for (let i = 0; i < input.length; i++) {
            let syllable = "";

            for (let j = 0; j < this.jaCharsToEng.length; j++) {
                if (input[i] === this.jaCharsToEng[j].ja) {
                    syllable += this.jaCharsToEng[j].en;

                    if (this.jaCharsToEng[j].ja2) {
                        for (let k = 2; k <= 4; k++) {
                            if (input[i+1] === this.jaCharsToEng[j][`ja${k}`]) {
                                i++;
                                syllable = this.jaCharsToEng[j][`en${k}`];
                                break;
                            }
                        }
                    }

                    break;
                }
            }

            output[output.length] = syllable;
        }

        return output;
    }
}

const submitWord = function() {
    const input = document.getElementById("shiritori");

    game.checkRepeatsThenPlay(input.value);

    input.value = "";

    renderGame();
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
        lastThreeWords[slotNum].romanized = game.romanize(lastThreeWords[slotNum].ja);
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
            if (lastThreeWords[slotNum].ja[1] === "ゃ" || lastThreeWords[slotNum].ja[1] === "ゅ" || lastThreeWords[slotNum].ja[1] === "ょ") {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(2);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0] + lastThreeWords[slotNum].ja[1];
            } else {
                lastThreeWords[slotNum].jaWithoutFirstChar = lastThreeWords[slotNum].ja.slice(1);
                lastThreeWords[slotNum].jaFirstChar = lastThreeWords[slotNum].ja[0];
            }

            if (lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゃ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ゅ" || lastThreeWords[slotNum].ja[lastThreeWords[slotNum].ja.length-1] === "ょ") {
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

        void document.getElementById("slot-0").offsetWidth;
        void document.getElementById("slot-1").offsetWidth;
        void document.getElementById("slot-2").offsetWidth;
        document.getElementById("slot-0").classList.add("translateFadeOut");
        document.getElementById("slot-1").classList.add("translate");
        document.getElementById("slot-2").classList.add("translateFadeIn");
    }
}

const preventSubmission = function(event) {
    var key = event.charCode || event.keyCode || 0;     
  if (key == 13) {
    event.preventDefault();
    submitWord();
  }
}