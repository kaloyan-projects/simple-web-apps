const inputText = document.getElementById('inputText');
const offsetInput = document.getElementById('offset');
const outputDiv = document.getElementById('output');

var changesMade = false;

function updateOutput() {
    changesMade = true;
    const text = inputText.value;
    const offset = parseInt(offsetInput.value) || 0; // Default to 0 if not a number
    let transformedText = '';

    for (let char of text) {
        const codePoint = char.codePointAt(0);
        const newCodePoint = codePoint + offset;
        transformedText += String.fromCodePoint(newCodePoint);
    }

    outputDiv.textContent = transformedText;
    }

inputText.addEventListener('input', updateOutput);
offsetInput.addEventListener('input', updateOutput);

window.addEventListener("beforeunload", function (e) {
    if (changesMade) {
        e.preventDefault();
        e.returnValue = '';
    }
});
