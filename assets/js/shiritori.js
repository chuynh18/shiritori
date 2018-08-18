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

        console.log(output);
        return output;
    }
}

const submitWord = function() {
    const input = document.getElementById("shiritori");

    game.checkRepeatsThenPlay(input.value);

    input.value = "";

    renderGame();
}

const renderGame = function() {
    const prevJa = document.getElementById("prev-ja");
    const prevEn = document.getElementById("prev-en");
    const playJa = document.getElementById("play-ja");
    const playEn = document.getElementById("play-en");

    if (game.playedWords.length === 0) {
        prevJa.innerHTML = '<span id="prev-ja-last"></span>';
        prevEn.innerHTML = '<span id="prev-en-last"></span>';
        playJa.innerHTML = '<span id="play-ja-first"></span>';
        playEn.innerHTML = '<span id="play-en-first"></span>';
    } else if (game.playedWords.length === 1) {
        const currentWord = game.playedWords[0];
        const romanizedCurrentWord = game.romanize(currentWord);
        const currentWordWithoutLastChar = currentWord.slice(0, -1);
        let romanizedCurrentWordWithoutLastChar = "";

        for (let i = 0; i < romanizedCurrentWord.length - 1; i++) {
            romanizedCurrentWordWithoutLastChar += `${romanizedCurrentWord[i]} • `;
        }

        if (currentWord[currentWord.length-1] === "ゃ" || currentWord[currentWord.length-1] === "ゅ" || currentWord[currentWord.length-1] === "ょ") {
            prevJa.insertBefore(document.createTextNode(currentWordWithoutLastChar.slice(0, -1)), document.getElementById("prev-ja-last"));
            document.getElementById("prev-ja-last").textContent = currentWord[currentWord.length-2] + currentWord[currentWord.length-1];
        } else {
            prevJa.insertBefore(document.createTextNode(currentWordWithoutLastChar), document.getElementById("prev-ja-last"));
            document.getElementById("prev-ja-last").textContent = currentWord[currentWord.length-1];
        }

        prevEn.insertBefore(document.createTextNode(romanizedCurrentWordWithoutLastChar), document.getElementById("prev-en-last"));
        document.getElementById("prev-en-last").textContent = romanizedCurrentWord[romanizedCurrentWord.length-1];

    } else {
        prevJa.innerHTML = '<span id="prev-ja-last"></span>';
        prevEn.innerHTML = '<span id="prev-en-last"></span>';
        playJa.innerHTML = '<span id="play-ja-first"></span>';
        playEn.innerHTML = '<span id="play-en-first"></span>';

        const previousWord = game.playedWords[game.playedWords.length - 2];
        const currentWord = game.playedWords[game.playedWords.length - 1];
        const romanizedPreviousWord = game.romanize(previousWord);
        const romanizedCurrentWord = game.romanize(currentWord);
        const previousWordWithoutLastChar = previousWord.slice(0, -1);
        const currentWordWithoutFirstChar = currentWord.slice(1);
        let romanizedPreviousWordWithoutLastChar = "";
        let romanizedCurrentWordWithoutFirstChar = "";

        for (let i = 0; i < romanizedPreviousWord.length-1; i++) {
            romanizedPreviousWordWithoutLastChar += `${romanizedPreviousWord[i]} • `;
        }

        for (let i = 1; i < romanizedCurrentWord.length; i++) {
            romanizedCurrentWordWithoutFirstChar += ` • ${romanizedCurrentWord[i]}`;
        }

        if (previousWord[previousWord.length-1] === "ゃ" || previousWord[previousWord.length-1] === "ゅ" || previousWord[previousWord.length-1] === "ょ") {
            prevJa.insertBefore(document.createTextNode(previousWordWithoutLastChar.slice(0, -1)), document.getElementById("prev-ja-last"));
            document.getElementById("prev-ja-last").textContent = previousWord[previousWord.length-2] + previousWord[previousWord.length-1];
        } else {
            prevJa.insertBefore(document.createTextNode(previousWordWithoutLastChar), document.getElementById("prev-ja-last"));
            document.getElementById("prev-ja-last").textContent = previousWord[previousWord.length-1];
        }

        if (currentWord[1] === "ゃ" || currentWord[1] === "ゅ" || currentWord[1] === "ょ") {
            document.getElementById("play-ja-first").textContent = currentWord[0] + currentWord[1];
            document.getElementById("play-ja").appendChild(document.createTextNode(currentWord.slice(2)));
        } else {
            document.getElementById("play-ja-first").appendChild(document.createTextNode(currentWord[0]));
            document.getElementById("play-ja").appendChild(document.createTextNode(currentWordWithoutFirstChar));
        }
        
        prevEn.insertBefore(document.createTextNode(romanizedPreviousWordWithoutLastChar), document.getElementById("prev-en-last"));
        document.getElementById("prev-en-last").textContent = romanizedPreviousWord[romanizedPreviousWord.length-1];
        document.getElementById("play-en-first").appendChild(document.createTextNode(romanizedCurrentWord[0]));
        document.getElementById("play-en").appendChild(document.createTextNode(romanizedCurrentWordWithoutFirstChar));
    }
}

const preventSubmission = function(event) {
    var key = event.charCode || event.keyCode || 0;     
  if (key == 13) {
    event.preventDefault();
    submitWord();
  }
}