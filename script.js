function add(a, b){return a + b}

function subtract(a, b){return a - b}

function multiply(a, b){return a * b}

function divide(a, b){return a / b}

function operate(a, b, operator){
    a = +a;
    b = +b;
    let result;
    switch(operator){
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = subtract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            result = divide(a, b);
            break;
        default:
            return 'Oops! Please enter a proper operation!';
    }
    return result
}

let displayValueStorage = ['12345', '9877'];
const validOperators = /^\.\X\+\-\/]*$/g;
const validNumbers = /^[0-9]*$/g;

// FIX THIS
// - if index contains numbers, and adding numbers, add the number to the end (right)
// - if index contains number, and adding operator, make a new index value with operator
// - if index contains operator, and adding number, make a new index value with number
// - if index contains operator, and adding operator, do nothing
// - if array has nothing, and adding number, add number to new index
// - if array has nothing, and adding operator, do nothing
//
// I'm also putting the operator and number logic in here because it's the lowest level
// to actually

function updateDisplayValueStorage(value){
    //get array value
    let latestDisplayArrayItem = displayValueStorage[displayValueStorage.length - 1];
    //update array value
        latestDisplayArrayItem += value;
    //replace array value with updated value
        displayValueStorage[displayValueStorage.length - 1] = latestDisplayArrayItem;

        latestDisplayArrayItem = displayValueStorage[displayValueStorage.length - 1];

}


// FIX THIS
// - Loop through every item in displayValueStorage
// - Break that item into individual characters using .split('') on that 
//   element and put the result into an array
// - Concatenate that array into tempCharacterStorage
// - Loop through tempCharacterStorage and make sure every character == 
//   one of the following:
//      -  [0-9]
//      -  '.', '+', '-', 'X', '/'
// - Return true if it does, false if it doesn't
function validateDisplayValueStorage(array){
    let elementCharacters = [];
    array.forEach((element, index) =>{
        let currentItemCharacters = element[index - 1].split('');
        console.log(currentItemCharacters);
        elementCharacters.concat(currentItemCharacters);
    })
    console.log(elementCharacters);
}


function countArray(array){
    let count = 0;
    array.forEach(element =>{
        let currentItemCount = element.split('').length;
            count += currentItemCount;
    })
    return count
}



// This is gonna be a complicated one, first I wanna get display stuff done correctly
// should only happen when the user clicks '='

function evaluate(){




}




function updateDisplay(input){



    // Just making sure everything looks to be good before 
    // continuing on, to prevent breaks and malicious user 
    // input.

    // validate storage
    let validStorage = validateDisplayValueStorage(displayValueStorage);
    if(validStorage === false ){return}

    // Make sure it looks to be under 16 characters
    let smallEnoughInput = countArray(displayValueStorage);
    if(smallEnoughInput > 16){return}

    switch(input){
        case '+' :
        case '-' :
        case '/' :
        case 'X' :
            updateDisplayValueStorage(` ${input} `);
            break; 
        case (input <= 9) :
        case (input >= 0) :
        case (typeof(+input) == 'number') :
            updateDisplayValueStorage(input);
            break;
        case '.' :
            // UPDATE THIS AT THE END
            break;
        case '=':
            // UPDATE THIS AFTER DONE WITH WORKING ON THE DISPLAY
            evaluate(displayValueStorage);
        break;
    }

    let currentDisplay =  document.querySelector('.display-output').textContent;
    let addDisplayValue = displayValueStorage;
    console.log(currentDisplay);
    console.log(addDisplayValue);
    
}

function validateInput(input){
    let validNumber = validNumbers.test(input);
    let validOperator = validOperators.test(input);
    if( (validNumber == true && input.length == 1) ||
        (validOperator == true && input.length == 1) ||
        input == '.' ||
        input == '=' ||
        input == 'Clear'){
                return true
            }else{
                return false
            }
}



let buttons = document.querySelectorAll(".input");

/*  ~ Just writing some explanation because this solution is a bit obtuse ~
    Loop through each input button and add an event listener

*/

buttons.forEach(currentValue => {
    currentValue.addEventListener('click', e => {
        if(currentValue.classList.contains('input') == true){
            let inputValue = currentValue.textContent;
            let validInput = validateInput(inputValue);
            if(validInput == true){
                updateDisplay(inputValue);
            }else{
                console.log('Hey! >:( you ain\'t supposed to be doin\' that!');
            };
        };
    });
});
