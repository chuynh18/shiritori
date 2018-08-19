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
    const prevJa = document.getElementById("prev-ja");
    const prevEn = document.getElementById("prev-en");
    const prevMeaning = document.getElementById("prev-meaning");
    const playJa = document.getElementById("play-ja");
    const playEn = document.getElementById("play-en");
    const playMeaning = document.getElementById("play-meaning");
    const prevJaDisp = document.getElementById("prev-ja-disappear");
    const prevEnDisp = document.getElementById("prev-en-disappear");
    const prevMeaningDisp = document.getElementById("prev-meaning-disappear");

    if (game.playedWords.length === 0) {
        prevJa.innerHTML = '<span id="prev-ja-last"></span>';
        prevEn.innerHTML = '<span id="prev-en-last"></span>';
        playJa.innerHTML = '<span id="play-ja-first"></span>';
        playEn.innerHTML = '<span id="play-en-first"></span>';
        prevJaDisp.innerHTML = '<span id="prev-ja-last-disappear">';
        prevEnDisp.innerHTML = '<span id="prev-en-last-disappear">';
        prevMeaning.textContent = "";
        playMeaning.textContent = "";

    } else if (game.playedWords.length === 1) {
        lastThreeWords[1].ja = game.playedWords[0];
        lastThreeWords[1].romanized = game.romanize(lastThreeWords[1].ja);

        for (let i = 0; i < lastThreeWords[1].romanized.length - 1; i++) {
            lastThreeWords[1].romanizedWithoutLastChar += `${lastThreeWords[1].romanized[i]} • `;
        }

        if (lastThreeWords[1].ja[lastThreeWords[1].ja.length-1] === "ゃ" || lastThreeWords[1].ja[lastThreeWords[1].ja.length-1] === "ゅ" || lastThreeWords[1].ja[lastThreeWords[1].ja.length-1] === "ょ") {
            lastThreeWords[1].jaWithoutLastChar = lastThreeWords[1].ja.slice(0, -2);
            lastThreeWords[1].jaLastChar = lastThreeWords[1].ja[0] + lastThreeWords[1].ja[1];
        } else {
            lastThreeWords[1].jaWithoutLastChar = lastThreeWords[1].ja.slice(0, -1);
            lastThreeWords[1].jaLastChar = lastThreeWords[1].ja[0];
        }

        prevJa.insertBefore(document.createTextNode(lastThreeWords[1].jaWithoutLastChar), document.getElementById("prev-ja-last"));
        document.getElementById("prev-ja-last").textContent = lastThreeWords[1].jaLastChar;

        prevEn.insertBefore(document.createTextNode(lastThreeWords[1].romanizedWithoutLastChar), document.getElementById("prev-en-last"));
        document.getElementById("prev-en-last").textContent = lastThreeWords[1].romanized[lastThreeWords[1].romanized.length-1];

        for (let i = 0; i < dictionary.length; i++) {
            if (lastThreeWords[1].ja === dictionary[i].ja) {
                lastThreeWords[1].meaning = dictionary[i].en;
                prevMeaning.textContent = lastThreeWords[1].meaning;
                break;
            }
        }

        document.getElementById("previousWord").classList.add("fadeIn");

    } else if (game.playedWords.length === 2){
        playJa.innerHTML = '<span id="play-ja-first"></span>';
        playEn.innerHTML = '<span id="play-en-first"></span>';

        lastThreeWords[2].ja = game.playedWords[game.playedWords.length - 1];
        lastThreeWords[2].romanized = game.romanize(lastThreeWords[2].ja);
        lastThreeWords[2].romanizedWithoutFirstChar = lastThreeWords[2].romanized.slice(1).join(" • ");
        lastThreeWords[2].romanizedWithoutLastChar = lastThreeWords[2].romanized.slice(0, -1).join(" • ");

        if (lastThreeWords[2].ja[1] === "ゃ" || lastThreeWords[2].ja[1] === "ゅ" || lastThreeWords[2].ja[1] === "ょ") {
            lastThreeWords[2].jaWithoutFirstChar = lastThreeWords[2].ja.slice(2);
            lastThreeWords[2].jaFirstChar = lastThreeWords[2].ja[0] + lastThreeWords[2].ja[1];
        } else {
            lastThreeWords[2].jaWithoutFirstChar = lastThreeWords[2].ja.slice(1);
            lastThreeWords[2].jaFirstChar = lastThreeWords[2].ja[0];
        }

        document.getElementById("play-ja-first").textContent = lastThreeWords[2].jaFirstChar;

        if (lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ゃ" || lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ゅ" || lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ょ") {
            lastThreeWords[2].jaWithoutLastChar = lastThreeWords[2].ja.slice(0, -2);
            lastThreeWords[2].jaLastChar = lastThreeWords[2].ja[lastThreeWords[2].ja.length-2] + lastThreeWords[2].ja[lastThreeWords[2].ja.length-1];
        } else {
            lastThreeWords[2].jaWithoutLastChar = lastThreeWords[2].ja.slice(0, -1);
            lastThreeWords[2].jaLastChar = lastThreeWords[2].ja[lastThreeWords[2].ja.length-1];
        }

        for (let i = 0; i < dictionary.length; i++) {
            if (lastThreeWords[2].ja === dictionary[i].ja) {
                lastThreeWords[2].meaning = dictionary[i].en;
                playMeaning.textContent = lastThreeWords[2].meaning;
                break;
            }
        }

        playJa.appendChild(document.createTextNode(lastThreeWords[2].jaWithoutFirstChar));
        playEn.appendChild(document.createTextNode(` • ${lastThreeWords[2].romanizedWithoutFirstChar}`));
        document.getElementById("play-en-first").textContent = lastThreeWords[2].romanized[0];

        document.getElementById("playedWord").classList.add("fadeIn");
    } else {
        lastThreeWords[0] = JSON.parse(JSON.stringify(lastThreeWords[1]));
        lastThreeWords[1] = JSON.parse(JSON.stringify(lastThreeWords[2]));

        document.getElementById("previousWordDisappear").classList.remove("fadeIn", "translateFadeOut");
        document.getElementById("previousWord").classList.remove("fadeIn", "translate");
        document.getElementById("playedWord").classList.remove("fadeIn", "translateFadeIn");

        prevJa.innerHTML = '<span id="prev-ja-last"></span>';
        prevEn.innerHTML = '<span id="prev-en-last"></span>';
        playJa.innerHTML = '<span id="play-ja-first"></span>';
        playEn.innerHTML = '<span id="play-en-first"></span>';
        prevJaDisp.innerHTML = '<span id="prev-ja-last-disappear"></span>';
        prevEnDisp.innerHTML = '<span id="prev-en-last-disappear"></span>';

        lastThreeWords[2].ja = game.playedWords[game.playedWords.length - 1];
        lastThreeWords[2].romanized = game.romanize(lastThreeWords[2].ja);
        lastThreeWords[2].romanizedWithoutFirstChar = lastThreeWords[2].romanized.slice(1).join(" • ");
        lastThreeWords[2].romanizedWithoutLastChar = lastThreeWords[2].romanized.slice(0, -1).join(" • ");

        if (lastThreeWords[2].ja[1] === "ゃ" || lastThreeWords[2].ja[1] === "ゅ" || lastThreeWords[2].ja[1] === "ょ") {
            lastThreeWords[2].jaWithoutFirstChar = lastThreeWords[2].ja.slice(2);
            lastThreeWords[2].jaFirstChar = lastThreeWords[2].ja[0] + lastThreeWords[2].ja[1];
        } else {
            lastThreeWords[2].jaWithoutFirstChar = lastThreeWords[2].ja.slice(1);
            lastThreeWords[2].jaFirstChar = lastThreeWords[2].ja[0];
        }

        document.getElementById("play-ja-first").textContent = lastThreeWords[2].jaFirstChar;

        if (lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ゃ" || lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ゅ" || lastThreeWords[2].ja[lastThreeWords[2].ja.length-1] === "ょ") {
            lastThreeWords[2].jaWithoutLastChar = lastThreeWords[2].ja.slice(0, -2);
            lastThreeWords[2].jaLastChar = lastThreeWords[2].ja[lastThreeWords[2].ja.length-2] + lastThreeWords[2].ja[lastThreeWords[2].ja.length-1];
        } else {
            lastThreeWords[2].jaWithoutLastChar = lastThreeWords[2].ja.slice(0, -1);
            lastThreeWords[2].jaLastChar = lastThreeWords[2].ja[lastThreeWords[2].ja.length-1];
        }

        for (let i = 0; i < dictionary.length; i++) {
            if (lastThreeWords[2].ja === dictionary[i].ja) {
                lastThreeWords[2].meaning = dictionary[i].en;
                playMeaning.textContent = lastThreeWords[2].meaning;
                break;
            }
        }

        playJa.appendChild(document.createTextNode(lastThreeWords[2].jaWithoutFirstChar));
        playEn.appendChild(document.createTextNode(` • ${lastThreeWords[2].romanizedWithoutFirstChar}`));
        document.getElementById("play-en-first").textContent = lastThreeWords[2].romanized[0];

        prevJa.insertBefore(document.createTextNode(lastThreeWords[1].jaWithoutLastChar), document.getElementById("prev-ja-last"));
        document.getElementById("prev-ja-last").textContent = lastThreeWords[1].jaLastChar;
        prevEn.insertBefore(document.createTextNode(`${lastThreeWords[1].romanizedWithoutLastChar} • `), document.getElementById("prev-en-last"));
        document.getElementById("prev-en-last").textContent = `${lastThreeWords[1].romanized[lastThreeWords[1].romanized.length-1]}`;
        document.getElementById("prev-meaning").textContent = lastThreeWords[1].meaning;

        prevJaDisp.insertBefore(document.createTextNode(lastThreeWords[0].jaWithoutLastChar), document.getElementById("prev-ja-last-disappear"));
        document.getElementById("prev-ja-last-disappear").textContent = lastThreeWords[0].jaLastChar;
        prevEnDisp.insertBefore(document.createTextNode(`${lastThreeWords[0].romanizedWithoutLastChar}`), document.getElementById("prev-en-last-disappear"));
        document.getElementById("prev-en-last-disappear").textContent = `${lastThreeWords[0].romanized[lastThreeWords[0].romanized.length-1]}`;
        document.getElementById("prev-meaning-disappear").textContent = lastThreeWords[0].meaning;

        void document.getElementById("previousWordDisappear").offsetWidth;
        void document.getElementById("previousWord").offsetWidth;
        void document.getElementById("playedWord").offsetWidth;
        document.getElementById("previousWordDisappear").classList.add("translateFadeOut");
        document.getElementById("previousWord").classList.add("translate");
        document.getElementById("playedWord").classList.add("translateFadeIn");
    }
}

const preventSubmission = function(event) {
    var key = event.charCode || event.keyCode || 0;     
  if (key == 13) {
    event.preventDefault();
    submitWord();
  }
}