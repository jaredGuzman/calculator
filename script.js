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