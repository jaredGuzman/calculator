// TODO

// ADD BACKSPACE BUTTON
// ADD KEYBOARD SUPPORT




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



let buttons = document.querySelectorAll(".input");



/* 
 *  GENERAL PATH OF LOGIC:
 *   updateDisplay -> updateDisplayValueStorage -> 
 *   parseOutput -> populate display (using document.querySelector)
 */


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