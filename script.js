function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    a = +a;
    b = +b;
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'X':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            console.log('Oops! Please enter a proper operation!');
    }
    result = Math.round(result * 1000) / 1000
    return result
}

let displayValueStorage = [''];
let calculationDisplayValueStorage = [''];
let previouslyEvaluated = false;
const validOperators = /^[\.X\+\-\/]$/;
const validNumbers = /^[0-9]$/;
let currentlyEvaluating = false;


function countArray(array) {
    let count = 0;
    array.forEach(element => {
        let currentItemCount = element.split('').length;
        count += currentItemCount;
    })
    return count;
}

function splitChars(array) {
    let elementCharacters = [];
    array.forEach((element) => {
        let currentItemCharacters = element.split('');
        elementCharacters = elementCharacters.concat(currentItemCharacters);
    });
    return elementCharacters;
}

function evaluate() {
    let firstValue = displayValueStorage[0];
    let secondValue = displayValueStorage[1];
    let thirdValue = displayValueStorage[2];
    currentlyEvaluating = true;
    let storageLength = displayValueStorage.length;
    let numberOfOperations = (storageLength - 1) / 2;

    if (storageLength >= 3) {
        for(let i = 0; i < numberOfOperations; i++){
            result = operate(firstValue, secondValue, thirdValue);
            let valueStorageTemp = displayValueStorage.slice(3);
            displayValueStorage = [`${result}`];
            displayValueStorage = displayValueStorage.concat(valueStorageTemp);
            firstValue = displayValueStorage[0];
            secondValue = displayValueStorage[1];
            thirdValue = displayValueStorage[2];
        }
        output = parseOutput(displayValueStorage, '');
        document.querySelector('.display-output').textContent = output;
        currentlyEvaluating = false;
        previouslyEvaluated = true;
        return;
    } else if (storageLength <= 2) {
        updateDisplay(firstValue);
        currentlyEvaluating = false;
        previouslyEvaluated = true;
        return;
    }
}


function validateInput(input) {
    let validNumber = validNumbers.test(input);
    let validOperator = validOperators.test(input);
    if ((validNumber == true && input.length == 1) ||
        (validOperator == true && input.length == 1) ||
        input == '.' ||
        input == '=' ||
        input == 'C') {
        return true;
    } else {
        return false;
    }
}

// returns the proper string to display in the output using the displayvaluestorage and input 
// by removing commas and adding spaces
function parseOutput(displayValueStorage) {
    let parsedOutputStorage = splitChars(displayValueStorage),
        parsedOutput = '';

    parsedOutputStorage.forEach(element => {
        let elementType = getType(element);
        switch (elementType) {
            case 'operator':
                parsedOutput = parsedOutput + ` ${element} `;
                break;
            case 'number':
                parsedOutput = parsedOutput + `${element}`;
                break;
            case 'decimal':
                parsedOutput = parsedOutput + `${element}`;
                break;
            default:
                parsedOutput = 'ERROR';
        }
    });
    return parsedOutput
}

// returns can equal 'number' or 'operator' or 'invalid' or 'equal' or 'decimal'
function getType(value) {
    const inputTypes = {
        operator: false,
        number: false,
        equals: false,
        decimal: false,
        clear: false
    }
    value = String(value);
    let exists;
    let invalid = false;
    switch (value) {
        case '+':
        case '-':
        case 'X':
        case '/':
            inputTypes.operator = true;
            break;
        case '=':
            inputTypes.equals = true;
            break;
        case '.':
            inputTypes.decimal = true;
            break;
        case 'C':
            inputTypes.clear = true;
            break;
        default:
            if (isNaN(value) == false) {
                inputTypes.number = true;
            } else {
                invalid = true;
            }
    }


    for (key in inputTypes) {
        key == true && exists == true ? invalid = true : invalid = false;
        key == true ? exists = true : exists = false;
    }

    if (invalid == true) {
        return 'invalid'
    };

    if (inputTypes.number == true) {
        return 'number';
    }
    if (inputTypes.operator == true) {
        return 'operator';
    }
    if (inputTypes.equals == true) {
        return 'equals';
    }
    if (inputTypes.decimal == true) {
        return 'decimal';
    }
    if (inputTypes.clear == true) {
        return 'clear';
    }

    return 'invalid';
}

function getLastItemType() {
    let latestDisplayArrayItem = displayValueStorage[displayValueStorage.length - 1].split();
    let operator = false,
        number = false,
        invalid = false;
    latestDisplayArrayItem.forEach(element => {
        switch (element) {
            case '+':
            case '-':
            case 'X':
            case '/':
                operator = true;
                break;
            default:
                number = true;
        }
        (number == true) && (operator == true) ? invalid = true: invalid = false;
    })
    if (latestDisplayArrayItem <= 0) {
        return 'invalid';
    }
    if (invalid == true) {
        return 'invalid';
    }
    if (number == true) {
        return 'number';
    }
    if (operator == true) {
        return 'operator';
    }
    return 'invalid';
}

function addToStorage(value, lastItem, lastItemType, inputType) {
    switch (inputType) {
        case 'operator':
            if (lastItemType == 'number') {
                displayValueStorage.push(value)
            };
            break;
        case 'number':
            if (lastItemType == 'operator' || displayValueStorage.length <= 0) {
                if (lastItem == '/' && value == '0') {
                    console.log('Throw a fancy error here!');
                    return;
                } else {
                    displayValueStorage.push(value);
                }
            } else {
                displayValueStorage[displayValueStorage.length - 1] += value;
            }
            break;
        case 'decimal':
            if (lastItemType == 'number') {
                displayValueStorage[displayValueStorage.length - 1] += value;
            };
            break;
        case 'equals':
            console.log('Equality operator cannot be used this way!')
            break;
        default:
            console.log('something went wrong');
    }
}

function updateDisplayValueStorage(value) {
    let lastItem = displayValueStorage[displayValueStorage.length - 1];
    let lastItemType = getLastItemType();
    let inputType = getType(value);

    if (lastItemType == 'operator') {
        switch (inputType) {
            case 'invalid':
                console.log(`${value} - invalid input`);
                break;
            case 'operator':
                console.log(`${value} - attempted to add after operator`);
                break;
            case 'equals':
                console.log(`${value} - attempted to add after operator`);
                break;
            case 'decimal':
                console.log(`${value} - attempted to add after operator`);
                break;
            default:
                addToStorage(value, lastItem, lastItemType, inputType);
                console.log(`${value} - number added after operator`);
                break;
        }
    } else if (lastItemType == 'number' || displayValueStorage <= 0) {
        switch (inputType) {
            case 'operator':
                addToStorage(value, lastItem, lastItemType, inputType);
                console.log(`${value} - operator added after number`);
                break;
            case 'number':
                addToStorage(value, lastItem, lastItemType, inputType);
                console.log(`${value} - number added after number`);
                break;
            case 'decimal':
                addToStorage(value, lastItem, lastItemType, inputType);
                console.log(`${value} - decimal added after number`);
                break;
            default:
                console.log(`Something went wrong in updateDisplayValueStorage value = ${value}`);
        }
    };

}

function resetDisplayStorage() {
    displayValueStorage.length = 0;
    displayValueStorage[0] = '';
}

function updateDisplay(input) {
    // let validStorage = validateDisplayValueStorage(displayValueStorage);
    // if(validStorage === false ){return;}

    let currentInputType = getType(input);
    let parsedOutput;

    let smallEnoughInput = countArray(displayValueStorage);
    if (smallEnoughInput > 13) {
        return;
    }
    switch (currentInputType) {
        case 'operator':
            if (smallEnoughInput > 9) {
                return;
            }
            updateDisplayValueStorage(input);
            parsedOutput = parseOutput(displayValueStorage);
            document.querySelector('.display-output').textContent = parsedOutput;
            document.querySelector('.calculation-display-output').textContent = parsedOutput;
            break;
        case 'number':
            if (currentlyEvaluating == true) {
                document.querySelector('.display-output').textContent = input;
            } else {
                updateDisplayValueStorage(input);
                parsedOutput = parseOutput(displayValueStorage, input);
                document.querySelector('.display-output').textContent = parsedOutput;
                document.querySelector('.calculation-display-output').textContent = parsedOutput;
            }
            break;
        case 'decimal':
            // UPDATE THIS AT THE END
            break;
        case 'equals':
            // UPDATE THIS AFTER DONE WITH WORKING ON VALIDATION
            evaluate();
            break;
        case 'clear':
            resetDisplayStorage();
            document.querySelector('.display-output').textContent = '0';
            document.querySelector('.calculation-display-output').textContent = ' ';
            break;
    }

}

let buttons = document.querySelectorAll(".input");

buttons.forEach(currentValue => {
    currentValue.addEventListener('click', e => {
        if (currentValue.classList.contains('input') == true) {
            let inputValue = currentValue.textContent;
            let validInput = validateInput(inputValue);
            if (validInput == true) {
                updateDisplay(inputValue);
                console.log(displayValueStorage);
            } else {
                console.log('Hey! >:( you ain\'t supposed to be doin\' that!');
            }
        }
    });
});