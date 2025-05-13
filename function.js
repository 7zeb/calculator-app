let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    if (currentInput === '' && number === '-') { // Allow negative numbers
        currentInput = '-';
    } else {
        currentInput += number;
    }
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate(); 
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';
}

// New Feature in Release 5: Copy Button
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("copyBtn").addEventListener("click", function() {
        const displayElement = document.getElementById("display"); // Get the display field
        const displayValue = displayElement.value.trim(); // Get its actual contents

        if (displayValue !== "") {
            navigator.clipboard.writeText(displayValue)
            .then(() => {
                alert("Copied: " + displayValue); // Shows what was copied
            })
            .catch(err => {
                console.error("Failed to copy:", err);
            });
        } else {
            alert("Nothing to copy!"); // Prevent empty clipboard copies
        }
    });
});

//making keyboard work (Release 6)
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key)) { // If the key is a number
        appendNumber(key);
    } else if (["+","-","*","/"].includes(key)) { // If the key is an operator
        appendOperation(key);
    } else if (key === "Enter") { // If Enter is pressed, calculate
        calculate();
    } else if (key === "Backspace") { // Remove last character
        currentInput = currentInput.slice(0, -1);
        document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
    } else if (key.toLowerCase() === "c") { // Make "C" key clear the display
    clearDisplay();
}
});
