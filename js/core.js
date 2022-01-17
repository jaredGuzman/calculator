let displayValueStorage = [''];
let calculationDisplayValueStorage = [''];
let previouslyEvaluated = false;
let currentlyEvaluating = false;

function resetDisplayStorage() {
    displayValueStorage.length = 0;
    displayValueStorage[0] = '';
}


// returns the proper string to display in the output using the displayvaluestorage and input 
// by removing commas and adding spaces
function parseOutput(displayValueStorage) {
    let parsedOutputStorage = splitChars(displayValueStorage),
        parsedOutput = '';
    let validArray = validateArray(parsedOutputStorage);

    if(validArray != false){
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
    }else{
        return (parsedOutput = 'ERROR');
    };
    return parsedOutput;
}

// adds an input value to the displayValueStorage

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
            }else if(lastItemType == 'operator'){
                displayValueStorage.push(`0${value}`);
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

    if(currentlyEvaluating == false){
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
                    addToStorage(value, lastItem, lastItemType, inputType);
                    console.log(`0${value} - added after operator`);
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
                    //need to make sure the latest number item does not contain a decimal.
                    //if it does, we want to throw an error
                    let containsDecimal = checkforDecimal();
                    if(containsDecimal == true){
                        console.log('Throw fancy error here');
                    }else{
                        addToStorage(value, lastItem, lastItemType, inputType);
                        console.log(`${value} - decimal added after number`);
                    }
                    break;
                default:
                    console.log(`Something went wrong in updateDisplayValueStorage value = ${value}`);
            }
        }else if (lastItemType == 'decimal' && inputType != 'decimal'){
            addToStorage(value, lastItem, lastItemType, inputType);
            console.log(`${value} added after decimal`)
        };
    }else if(currentlyEvaluating == true){
        displayValueStorage = value;
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
            } else {
                console.log('Hey! >:( you ain\'t supposed to be doin\' that!');
            }
        }
    });
});