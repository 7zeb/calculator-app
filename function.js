let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
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
document.addEventListener("DOMContentLoaded", function() { // Ensures the DOM is fully loaded before running
    document.getElementById("copyBtn").addEventListener("click", function() {
        const displayElement = document.getElementById("display"); // Get the display element
        const displayValue = displayElement.value.trim(); // Ensure it's grabbing the correct value

        if (displayValue !== "") {
            navigator.clipboard.writeText(displayValue).then(() => {
                alert("Copied to clipboard!"); // You can replace this with a custom notification if needed
            }).catch(err => {
                console.error("Failed to copy:", err);
            });
        } else {
            alert("Nothing to copy!"); // Prevent empty clipboard copies
        }
    });
});
