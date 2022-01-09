function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}


function checkInput(a, b){
    let check;
    if(Object.is(+a, NaN) == true || Object.is(+b, NaN) == true){
        check = false;
    }else{
        check = true
    }
    return check
}

function operate(a, b, operator){
    if(checkInput(a, b) == false){
        return 'Please input valid numbers!'
    }else{
        a = +a;
        b = +b;
    };
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

let displayValue = [''];

// get last index
// if index contains numbers, and adding numbers, add the number to the end (right)
// if index contains number, and adding operator, make a new index value with operator
// if index contains operator, and adding number, make a new index value with number
// if index contains operator, and adding operator, do nothing
// if array has nothing, and adding number, add number to new index
// if array has nothing, and adding operator, do nothing
function updateDisplayValue(value){
    //get array value
    let latestDisplayArrayItem = displayValue[displayValue.length - 1];
    //update array value
        latestDisplayArrayItem += value;
    //replace array value
        displayValue[displayValue.length - 1] = latestDisplayArrayItem;

        latestDisplayArrayItem = displayValue[displayValue.length - 1];

        document.querySelector('.display-output').textContent = latestDisplayArrayItem;
    



    console.log(displayValue[displayValue.length - 1]);
}

// grab each individual button's text content. if class='number', check it's a number,
// then update display. if class='operator', check it's 'X' '+' '/' or '-', then according
// to the case, update the display with ` ${operator} `.
// if it's 'Clear' do nothing (for now)
// if it's '.' do nothing (for now)
// if it's '=' do nothing (for now)




let buttons = document.querySelectorAll(".input");
buttons.forEach(function(currentValue, index) {
    currentValue.addEventListener('mousedown', e =>{
        if(currentValue.classList.contains('number') == true){
            // add value to list, then update display
            let value  = currentValue.textContent;
            updateDisplayValue(value);
        }
    });
    currentValue.addEventListener('mouseup', e =>{
        currentValue.classList.remove('shrink');
    });
    // console.log(currentValue);
})
