// Declare elements

const inputField = document.getElementById('inputField');
const languageSelect = document.getElementById('lang');
const lettersContainer = document.getElementById('letters');
const counter = document.getElementById("counter");
const title = document.getElementById('title');
const sentenceLength = document.getElementById("length");
const langlabel = document.getElementById("langlabel");

var usedLetters = 0;
var inputText = "";
var allLetters = 22;

// Translations
const translations = {
    en : {
        title : "Pangram Helper",
        input_placeholder : "Enter your sentence…",
        alphabet : "abcdefghijklmnopqrstuvwxyz",
        counter : () => `Used: 0/${allLetters} letters`,
        sen_length : () => `Length: ${inputText.length} letters`,
        langlabel_text : "Language: "
    },
    bg : {
        title : "Помощник за Панграми",
        input_placeholder : "Въведете вашето изречение…",
        alphabet : "абвгдежзийклмнопрстуфхцчшщъьюя",
        counter : () => `Използвани: 0/${allLetters} букви`,
        sen_length : () => `Дължина: ${inputText.length} букви`,
        langlabel_text : "Език: "
    }
};

// Warn before exiting if changes were made
let changesMade = false;
window.addEventListener("beforeunload", function (e) {
    if (changesMade) {
        e.preventDefault();
        e.returnValue = '';
    }
});

update_on_lang_change("en");

function update_on_lang_change(lang) {

    changesMade = true;

    // Get translations for language
    translation = translations[lang];
    allLetters = translation.alphabet.length;

    // Change titles and other elements
    document.title = translation.title;
    title.innerHTML = translation.title;
    inputField.placeholder = translation.input_placeholder;
    langlabel.innerHTML = translation.langlabel_text;

    // Create letter buttons
    lettersContainer.replaceChildren();
    for (const letter of translation.alphabet) {
        const letterButton = document.createElement('div');
        letterButton.classList.add('letter');
        letterButton.textContent = letter;
        lettersContainer.appendChild(letterButton);
    }

    // Change info
    counter.innerHTML = translation.counter();
    //console.log(translation.counter);
    sentenceLength.innerHTML = translation.sen_length();

    // Focus on field
    inputField.select();
    inputField.focus();
}

languageSelect.addEventListener('change', function() {
    console.log(this.value);
    update_on_lang_change(this.value);
});

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// Highlight used letters
inputField.addEventListener('input', () => {
    usedLetters = 0;
    changesMade = true;
    inputText = inputField.value.toLowerCase().replace(/[^a-zа-я]/g, '');
    const letterButtons = document.querySelectorAll('.letter');

    letterButtons.forEach(letterButton => {
        const letter = letterButton.textContent.toLowerCase();

        var timesUsed = 0;
        for(var i = 0; i < inputText.length; i++) {
            if (inputText[i]==letter)
                timesUsed++;
        }
        if(timesUsed==0)
            letterButton.style.backgroundColor = "transparent";
        else {
            var hue = 111 - ((timesUsed==1) ? 0 : (timesUsed-1) * 40);
            hue = hue.clamp(-9, 111);
            letterButton.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            usedLetters++;
        }
    });

    counter.innerHTML = "Used: " + usedLetters + "/" + translation.alphabet.length + " letters.";
    sentenceLength.innerHTML = "Length: " + inputText.length + " letters.";
    usedLetters = 0;
});
