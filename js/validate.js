const validOperators = /^[\.X\+\-\/]$/;
const validNumbers = /^[0-9]$/;


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


// validates all chars in the current array

function validateArray(input){

    input.forEach(element => {
        let validNumber = validNumbers.test(element);
        let validOperator = validOperators.test(element);

        if(validNumber == false || validOperator == false){
            return false;
        }
    });

    return true;

}

function checkforDecimal(){
    let latestDisplayArrayItem = displayValueStorage[displayValueStorage.length - 1].split();
    latestDisplayArrayItem = latestDisplayArrayItem[0];
    return latestDisplayArrayItem.includes('.');
}