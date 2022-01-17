function splitChars(array) {
    let elementCharacters = [];
    array.forEach((element) => {
        let currentItemCharacters = element.split('');
        elementCharacters = elementCharacters.concat(currentItemCharacters);
    });
    return elementCharacters;
}

function countArray(array) {
    let count = 0;
    array.forEach(element => {
        let currentItemCount = element.split('').length;
        count += currentItemCount;
    })
    return count;
}

// get the type of value in relation to what can be stored in the array
// returns 'number' or 'operator' or 'invalid' or 'equal' or 'decimal'
function getType(value) {
    // to add another input type, add it in here and add a return below
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
    if(latestDisplayArrayItem == '0.'){
        return 'decimal';
    }
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

// input can either equal the textcontent of a button on the page or the text that is 

function updateDisplay(input) {
    // let validStorage = validateDisplayValueStorage(displayValueStorage);
    // if(validStorage === false ){return;}


    let currentInputType
    currentlyEvaluating ? currentInputType = 'equals' : currentInputType = getType(input);

    let parsedOutput;

    let lastItem = getLastItemType();

    let smallEnoughInput = countArray(displayValueStorage);
    if (smallEnoughInput > 13) {
        return;
    }

    console.log()
    switch (currentInputType) {
        // make sure there is enough space and only add if the last item is not
        // also an operator
        case 'operator':
            if (smallEnoughInput > 9) {
                return;
            }
            updateDisplayValueStorage(input);
            parsedOutput = parseOutput(displayValueStorage);
            document.querySelector('.display-output').textContent = parsedOutput;
            document.querySelector('.calculation-display-output').textContent = parsedOutput;
            console.log(lastItem);
            break;
        case 'number':
            if (currentlyEvaluating == true) {
                document.querySelector('.display-output').textContent = input;
            } else {
                updateDisplayValueStorage(input);
                parsedOutput = parseOutput(displayValueStorage);
                document.querySelector('.display-output').textContent = parsedOutput;
                document.querySelector('.calculation-display-output').textContent = parsedOutput;
            }
            break;
        case 'decimal':
            if(lastItem = 'number'){
                updateDisplayValueStorage(input);
                parsedOutput = parseOutput(displayValueStorage, input);
                document.querySelector('.display-output').textContent = parsedOutput;
                document.querySelector('.calculation-display-output').textContent = parsedOutput;
            }else if(lastItem = 'operator'){
                updateDisplayValueStorage(input);
                parsedOutput = parseOutput(displayValueStorage, input);
                document.querySelector('.display-output').textContent = `${parsedOutput}`;
                document.querySelector('.calculation-display-output').textContent = `0${parsedOutput}`;
            }
            break;
        case 'equals':
            input = evaluate();
            parsedOutput = input;
            document.querySelector('.display-output').textContent = parsedOutput;
            break;
        case 'clear':
            resetDisplayStorage();
            document.querySelector('.display-output').textContent = '0';
            document.querySelector('.calculation-display-output').textContent = ' ';
            break;
    }

}