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

    if(latestDisplayArrayItem[0] == ''){
        return 'empty';
    }else if(latestDisplayArrayItem[0] == '0'){
        return 'number';
    }
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
    if (latestDisplayArrayItem == '0.') {return 'decimal';}
    if (latestDisplayArrayItem < 0) {return 'invalid';}
    if (invalid == true) {return 'invalid';}
    if (number == true) {return 'number';}
    if (operator == true) {return 'operator';}
    return 'invalid';
}


/** Takes an input, and populates the display value storage according to some logic
 *  notable exceptions are: 
 *      - cannot put two operators one after another
 *      - cannot divide by zero
 *      - cannot have multiple decimals in a single number
 * 
 * @param {*} input 
 * @returns nothing
 */

function updateDisplayValueStorage(input) {
    if(currentlyEvaluating == false){
        let lastItem = displayValueStorage[displayValueStorage.length - 1];
        let lastItemType = getLastItemType();
        let inputType = getType(input);


        switch(inputType){
            case 'invalid' :
                renderError('Invalid input type, please use 0-9, +-X/ or .');
                break;
            case 'number' :
                if (lastItemType == 'operator' || displayValueStorage.length <= 0) {
                    if (lastItem == '/' && input == '0') {
                        renderError('Hey! You and I both know you shouldn\'t do that! >:(');
                        return;
                    } else {
                        displayValueStorage.push(input);
                    }
                } else {
                    displayValueStorage[displayValueStorage.length - 1] += input;
                }
                break;
            case 'operator' :
                if(lastItemType == 'number'){
                    displayValueStorage.push(input)
                }else{
                    renderError(`Cannot add an operator after another operator!`);
                }
                break;
            case 'decimal' :
                let containsDecimal = checkforDecimal();
                if(containsDecimal == true){
                    renderError('Cannot have more than one decimal in a single number.');
                    break;
                }else{
                    switch(lastItemType){
                        case 'number' :
                            displayValueStorage[displayValueStorage.length - 1] += input;
                            break;
                        case 'operator' : 
                            displayValueStorage.push(`0${input}`);
                            break;
                        case 'empty' :
                            displayValueStorage[displayValueStorage.length - 1] += `0${input}`;
                            break;
                    }
                }
                break;
            default :
                renderError('Oops! something went wrong in UpdateDisplayValueStorage()!')

        }
    }else if(currentlyEvaluating == true){
        displayValueStorage = input;
    }

}

/**
 * Takes the input from the page, checks what type it is, updates storage,
 * parses storage, and populates the page with the parsed storage string.
 * 
 * There's no need for evaluation at this step because 1, evaluation happens
 * in the getType function, and 2, the item is re-validated when putting in
 * the next input via getLastItemType();
 * 
 * @param {*} input 
 * @returns proper display to page
 */

function updateDisplay(input) {


    let parsedOutput;

    let lastItemType = getLastItemType();
    let currentInputType = getType(input);

    let smallEnoughInput = countArray(displayValueStorage);
    if (smallEnoughInput > 13) {return;}




    switch (currentInputType) {
        case 'operator':
            if (smallEnoughInput > 9) {return;}
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
                parsedOutput = parseOutput(displayValueStorage);
                document.querySelector('.display-output').textContent = parsedOutput;
                document.querySelector('.calculation-display-output').textContent = parsedOutput;
            }
            break;
        case 'decimal':
            switch(lastItemType){
                case 'number' :
                    updateDisplayValueStorage(input);
                    parsedOutput = parseOutput(displayValueStorage, input);
                    document.querySelector('.display-output').textContent = parsedOutput;
                    document.querySelector('.calculation-display-output').textContent = parsedOutput;
                    break;
                case 'operator' :
                    updateDisplayValueStorage(input);
                    parsedOutput = parseOutput(displayValueStorage, input);
                    document.querySelector('.display-output').textContent = `${parsedOutput}`;
                    document.querySelector('.calculation-display-output').textContent = `0${parsedOutput}`;
                    break;
                case 'empty' :
                    updateDisplayValueStorage(input);
                    parsedOutput = parseOutput(displayValueStorage, input);
                    document.querySelector('.display-output').textContent = `${parsedOutput}`;
                    document.querySelector('.calculation-display-output').textContent = `${parsedOutput}`;
            }
            break;
        case 'equals':
            if(lastItemType == 'operator'){
                displayValueStorage.pop();
            }
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

/** Throws errors when the user does something they aren't supposed to.
 *  Examples include dividing by zero, adding multiple decimals in a single number,
 *  or attempting to add multiple operators one after another.
 * 
 * @param {*} input A string containing the error to display on the page
 */
function renderError(input){
    document.querySelector('.error-message').innerHTML = input;
    
    let error = document.querySelector('.error-message-wrapper');

    error.classList.add('opaque');
    setTimeout(toggleOpaqueClass, 2000);
}

function toggleOpaqueClass(){
    let error = document.querySelector('.error-message-wrapper');
    error.classList.remove('opaque');
}