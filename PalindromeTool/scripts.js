function reverse_s(s){
    return s.split("").reverse().join("");
}

var changesMade = false;

var message = document.getElementById("ispalendrome");
var reversed = document.getElementById("reversed");
check_for_palendrome();
inputField.addEventListener('input', () => {
    check_for_palendrome();
    changesMade = true;
});

function check_for_palendrome() {
    var text = inputField.value;
    reversed.innerHTML = "Reversed text: " + reverse_s(text);
    var text = text.toLowerCase().replace(/[^\p{L}]/gu, '');
    if (text == reverse_s(text) && text.length != 0) {
        message.innerHTML = "This is a palindrome.";
        message.style.color = "green";
    } else {
        message.innerHTML = "This is not a palindrome.";
        message.style.color = "red";
    }

}
window.addEventListener("beforeunload", function (e) {
    if (changesMade) {
        e.preventDefault();
        e.returnValue = '';
    }
});
