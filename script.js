const digits = [...Array(10).keys()];
const operators = ['÷', '×', '-', '+'];

class Operation {
    // a = 0;
    // b = 0;
    digits = [];
    numbers = [];
    operator = '';
    result = 0;
};

let operation = new Operation();

// Display
const display = document.querySelector('.display');
display.textContent= '0';

const container = document.querySelector('.button-container');

// Operator buttons
for(i in operators) {
    const operatorButton = document.createElement('div');
    operatorButton.classList.add('operator-button');
    
    const operator = document.createElement('div')
    operator.classList.add('operator');
    operator.textContent = String(operators[i]);

    operator.addEventListener('click', (e) => {
        if(e.target.textContent === '÷') {
            operation.operator = '/';
        } else if(e.target.textContent === '×') {
            operation.operator = '*';
        } else {
            operation.operator = e.target.textContent
        };
        const number = parseInt(operation.digits.join(''));
        if(!(isNaN(number))) {
            operation.numbers.push(number);
        }
        // operation.result = operation.numbers.slice(-1)[0];
        operation.digits = [];
    })

    operatorButton.appendChild(operator);
    container.appendChild(operatorButton);
};

// Clear button
const clearButton = document.createElement('div');
clearButton.classList.add('clear-button');
const clear = document.createElement('div')
clear.classList.add('clear');
clear.textContent = 'C';
clearButton.appendChild(clear);
container.appendChild(clearButton);

// Digit buttons
for(i in digits) {
    const digitButton = document.createElement('div');
    digitButton.classList.add('digit-button');
    
    const digit = document.createElement('div')
    digit.classList.add('digit');
    digit.textContent = String(digits[i]);

    digit.addEventListener('click', (e) => {
        operation.digits.push(e.target.textContent);
        // const number = parseInt(operation.digits.join(''));
        // operation.numbers.push(number);
        operation.result = parseInt(operation.digits.join(''));
        display.textContent = operation.result;
    })

    digitButton.appendChild(digit);

    container.appendChild(digitButton);
};

// Result button
const resultButton = document.createElement('div');
resultButton.classList.add('result-button');
const result = document.createElement('div')
result.classList.add('result');
result.textContent = '=';

resultButton.addEventListener('click', (e) => {
    const number = parseInt(operation.digits.join(''));
    operation.numbers.push(number);
    operation.digits = [];

    console.log(operation.numbers)
    // console.log(operation.operator)
    displayResult();
    operation.numbers = [];
    console.log(operation.result);
    operation.numbers.push(operation.result)
    operation.operator = '';
});

resultButton.appendChild(result);
container.appendChild(resultButton);


// Display input
function displayResult() {
    operate(operation);
    display.textContent = operation.result;
}

// Calculator functions

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
    }
};