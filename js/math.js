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

function evaluate() {
    // firstValue = number, secondValue = operation, thirdValue = number
    let firstValue = displayValueStorage[0];
    let secondValue = displayValueStorage[1];
    let thirdValue = displayValueStorage[2];

    let storageLength = displayValueStorage.length;
    let numberOfOperations = (storageLength - 1) / 2;

    currentlyEvaluating = true;

    // loop through the displayValueStorage and do operations the correct number of times
    if (storageLength >= 3) {
        for(let i = 0; i < numberOfOperations; i++){
            let result = [`${operate(firstValue, secondValue, thirdValue)}`];
            let temp = displayValueStorage.slice(3);
            output = result.concat(temp);
            updateDisplayValueStorage(output);

            // re-establish operation values
            firstValue = displayValueStorage[0];
            secondValue = displayValueStorage[1];
            thirdValue = displayValueStorage[2];
        }
        currentlyEvaluating = false;
        previouslyEvaluated = true;
        return output;
    } else if (storageLength <= 2) {
        currentlyEvaluating = false;
        previouslyEvaluated = true;
        return firstValue;
    }
}