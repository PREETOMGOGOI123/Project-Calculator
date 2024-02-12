
const clearText = document.getElementById('clear'); //gets the C button
const allClearText = document.getElementById('all-clear');//gets AC button

const operators = document.querySelectorAll('.operator');// get all the operation elements.

const numbers = document.querySelectorAll('.numbers');//get all the number buttons

const decimal = document.querySelector('.decimal');
// selects the equal to button
const resultEquals = document.getElementById('equates'); 
const displayScreen = document.querySelector('.display');//gets the div where result will be displayed



// object to store and remove input values
const input={
    inputs : [],
    result : []
};

// operational functions stored into object
const operations = {
    '+': sumFunc,
       
    '-': minusFunc,
        
    '*': multiplyfunc,
        
    '/': divFunction   
    }

// function to calculate addition of two numbers
function sumFunc(numA, numB){
    let result = parseFloat(numA) + parseFloat(numB);
    input.result = [...input.result, result] // pushes result inside the array inputArray.result
}
//function to calculate substraction of two numbers
function minusFunc(numA,numB){
    let result = parseFloat(numA) - parseFloat(numB);
    input.result = [...input.result, result]
}
// function to calculate multiplication of two numbers
function multiplyfunc(numA,numB){  
    let result = parseFloat(numA,numB) * parseFloat(numB);
    input.result = [...input.result, result]
    console.log(input);
}
//  function to calculate the division of two numbers
function divFunction(numA,numB){
    let result = parseFloat(numA,numB)/parseFloat(numB);
    input.result = [...input.result, result]
    console.log(input);
}


// function to call the operations when calculation needs to be performed
function calculate(){
   let numA = input.inputs[0];
   let numB = input.inputs[2]
   operations[input.inputs[1]](numA,numB);
   input.inputs = [];
   input.inputs = [...input.inputs,input.result[0]]
}

// function to reset the input array
function allClear(){
    input.inputs = [];
    input.result = [];
    display();
}

// function to display operations on screen
    function display(){
       displayScreen.innerHTML = `<h1>${input.inputs.join('')}</h1>`;
}

// function to capture input numbers and operations
function captureInput(inputValue){
    input.inputs = [...input.inputs, inputValue];
    console.log(input);
}

//function to validate input of numbers
function validateInputNumber(inputValue){
    if (input.result.length > 0){
        allClear();
        captureInput(inputValue);
    }
    else if(typeof input.inputs[input.inputs.length - 1] == 'number'){
        captureInput(inputValue);
        let spliced = parseFloat(input.inputs.splice(-2,2).join('')); //{ Remove the last two elements of the input.inputs array and then combine them into one integer}
        input.inputs = [...input.inputs, spliced];
        console.log(input);
    }
    else if(input.inputs[input.inputs.length - 1] == '.'){
        captureInput(inputValue);
        let decimalNum = parseFloat(input.inputs.splice(-3,3).join('')); //{Remove the last three elements of the input.inputs array and combine them to a decimal integer}
        input.inputs = [...input.inputs,decimalNum];
        console.log(input);
    }
    else{
        captureInput(inputValue);
    }
    display();
}

//function to validate input of operations 
function validateInputOps(inputValue){
   if (input.inputs.length == 0){
    return;
   }
   else if(typeof input.inputs[input.inputs.length-1] !== 'number'){
    let spliced = input.inputs.splice(1);
    console.log(spliced);
    captureInput(inputValue);
    console.log(input);
   }
   else if(input.inputs.length == 3){
   calculate();
   captureInput(inputValue);
   input.result = [];
   }
   else{
    captureInput(inputValue);
    input.result = [];
   }
   display();
}

//function to validate the input of decimal
function validateInputDecimal(inputValue){
    if(input.inputs.length == 0 || input.inputs[input.inputs.length - 1] == '.'){
        return;
    }
    else {
        captureInput(inputValue);
    }
    display();
}



//Event Listner for capturing numbers
numbers.forEach(numClick =>{
    numClick.addEventListener('click',function(event){
        const inputValue =  parseInt(event.target.textContent);
        validateInputNumber(inputValue);
        })
    });


//event listners for capturing operations
operators.forEach(opsClick =>{
        opsClick.addEventListener('click',function(){
            const inputValue = this.getAttribute('data-operation');
            validateInputOps(inputValue); 
        })
})

//event listener when decimal button is clicked
decimal.addEventListener('click',function(e){
    const inputValue = e.target.textContent;
    validateInputDecimal(inputValue);
})

//event listner when '=' button is clicked
    resultEquals.addEventListener('click',function(){
    if(input.inputs.length == 3){
        calculate();
    }
    else if(input.inputs.length == 2){ 
        input.inputs = [...input.inputs, input.inputs[0]];
        input.result = [];
        calculate();    
    }
    else{
        console.log(input);
    }
    display();
})

// event listner AC button is clicked
    allClearText.addEventListener('click',function(){
    allClear();
})

// event listner when C button is clicked
    clearText.addEventListener('click',function(){
    input.inputs.splice(-1,1);
    console.log(input);
})

//event listner when decimal button is clicked
decimal.addEventListener('click',function(e){
    e.stopPropagation
    const inputValue = e.target.textContent;
    validateInputDecimal(inputValue);
})