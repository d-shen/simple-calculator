// const digits = [...Array(10).keys()];
const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'];
const operators = ['÷', '×', '-', '+'];

class Operation {
    digits = [];
    numbers = [];
    operator = '';
    result = 0;
};

let operation = new Operation();

/**
 * Display
 */
const display = document.querySelector('.display');
display.textContent= '0';

/**
 * Containers
 */
const container = document.querySelector('.button-container');
const digitContainer = document.querySelector('.digit-container');
const operatorContainer = document.querySelector('.operator-container');
const miscContainer = document.querySelector('.misc-container');

/**
 * Operator buttons
 */
for(i in operators) {
    const operatorButton = document.createElement('div');
    operatorButton.classList.add('operator-button');
    operatorButton.textContent = String(operators[i]);

    operatorButton.addEventListener('click', (e) => {
        if(e.target.textContent === '÷') {
            operation.operator = '/';
        } else if(e.target.textContent === '×') {
            operation.operator = '*';
        } else {
            operation.operator = e.target.textContent
        };
        const number = parseFloat(operation.digits.join(''));
        if(!(isNaN(number))) {
            operation.numbers.push(number);
        }
        operation.digits = [];
    });

    operatorContainer.appendChild(operatorButton);
};

/**
 * Digit buttons
 */
for(i in digits) {
    const digitButton = document.createElement('div');
    digitButton.classList.add('digit-button');
    digitButton.textContent = String(digits[i]);

    digitButton.addEventListener('click', (e) => {
        operation.digits.push(e.target.textContent);
        operation.result = parseFloat(operation.digits.join(''));
        display.textContent = truncate(operation.result);
    });

    if(digitButton.textContent === '0') {
        digitButton.style.gridColumn = 'span 2'
    };

    digitContainer.appendChild(digitButton);
};

/**
 * Result button
 */
const resultButton = document.createElement('div');
resultButton.classList.add('result-button');
resultButton.textContent = '=';

resultButton.addEventListener('click', (e) => {
    const number = parseFloat(operation.digits.join(''));
    operation.numbers.push(number);
    operation.digits = [];

    // console.log(operation.numbers)
    displayResult();

    operation.numbers = [];
    console.log(operation.result);
    operation.numbers.push(operation.result)
    operation.operator = '';
});

operatorContainer.appendChild(resultButton);

/**
 * Clear button
 */
const clearButton = document.createElement('div');
clearButton.classList.add('clear-button');
clearButton.textContent = 'C';

clearButton.addEventListener('click', (e) => {
    operation.digits = [];
    operation.numbers = [];
    operation.result = 0;
    display.textContent = truncate(operation.result);
});

miscContainer.appendChild(clearButton);

/**
 * Sign button
 */
const signButton = document.createElement('div');
signButton.classList.add('sign-button');
signButton.textContent = '⁺∕₋';

signButton.addEventListener('click', (e) => {
    const number = parseFloat(operation.digits.join(''));
    operation.numbers.push(number * -1);
    operation.digits = [];
    display.textContent = truncate(number * -1);
});

miscContainer.appendChild(signButton);

/**
 * Percent button
 */
 const percentButton = document.createElement('div');
 percentButton.classList.add('percent-button');
 percentButton.textContent = '%';

 percentButton.addEventListener('click', (e) => {
    const number = parseFloat(operation.digits.join(''));
    if(!(isNaN(number))) {
        operation.numbers.push(number);
    }
    operation.digits = [];

    operation.operator = '%';

    displayResult();

    operation.numbers = [];
    console.log(operation.result);
    operation.numbers.push(operation.result)
    operation.operator = '';
});
 
 miscContainer.appendChild(percentButton);


// Display input
function displayResult() {
    operate(operation);
    display.textContent = truncate(operation.result);
}

// Truncate string to fit display
function truncate(str) {
    return String(str).substring(0, 7);
}

/**
 * Calculator functions
 */
function add(a, b) {
    return (a + b)
};

function subtract(a, b) {
    return (a - b)
};

function multiply(a, b) {
    return (a * b)
};

function divide(a, b) {
    return (a / b)
};

function percent(a) {
    return (a * 0.01)
}

function operate(o) {
    switch(o.operator) {
        case '+':
            operation.result = add(o.numbers[0], o.numbers[1]);
            break;
        case '-':
            operation.result = subtract(o.numbers[0], o.numbers[1]);
            break;
        case '*':
            operation.result = multiply(o.numbers[0], o.numbers[1]);
            break;
        case '/':
            operation.result = divide(o.numbers[0], o.numbers[1]);
            break;
        case '%':
            operation.result = percent(o.numbers[0]);
    }
};