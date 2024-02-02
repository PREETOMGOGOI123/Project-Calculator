
const clearText = document.getElementById('clear'); //gets the C button
const allClearText = document.getElementById('all-clear');//gets AC button

const operators = document.querySelectorAll('.operator');// get all the operation elements.

const numbers = document.querySelectorAll('.numbers');//get all the number buttons

// selects the equal to button
const resultEquals = document.getElementById('equates'); 
const displayScreen = document.querySelector('.display');//gets the div where result will be displayed



// object to store and remove input values
const input={
    num1 : [],
    ops  : [],
    num2 : [],
    result : []
};

// operational functions stored into object
const operations = {
    '+': function(num1,num2){
       return parseInt(num1) + parseInt(num2);
    },
    '-': function(num1,num2){
        return parseInt(num1) - parseInt(num2);
    },
    '*':function(num1,num2){
        return parseInt(num1) * parseInt(num2);
    },
    '/': function(num1,num2){
        return parseInt(num1) / parseInt(num2);
    },
}

// function to reset everything
function resetInput(){
 
        input.num1 = [];
        input.num2 = [];
        input.ops = []; 
        input.result = [];
    }

// function when C button is clicked
function backspace() {

    if (input.result.length > 0) {
        resetInput();
    } 
    else if (input.num2.length > 0) {
        input.num2 = input.num2.slice(0, -1); 
    } 
    else if (input.ops.length > 0) {
        input.ops = [];
    } 
    else if (input.num1.length > 0) {
        input.num1 = input.num1.slice(0, -1); 
    }
 
    display();
}



// function to calculate the inputs
function calculate(){
        let num1 = input.num1.join('');
        let num2 = input.num2.join('');
        let result = operations[input.ops[input.ops.length-1]](num1,num2);
        resetInput();
        input.result = [...input.result, result]; //Stores the result in input oibject
}


//function to push first number into in input object
function pushFirstNumber(numValue){
        input.num1 = [...input.num1, numValue];
        
}
// function to push second number into input object
function pushSecondNumber(numValue){
        input.num2 = [...input.num2, numValue];
}

//function to operator into input object
function pushOperator(opsValue){
        input.ops = [...input.ops, opsValue];
}

// function to validated the input of second number
function validateFirstNum(numValue){
    
    if(input.result.length > 0 || input.num1.length == 0){
       resetInput();
       pushFirstNumber(numValue);
       display();
       console.log(input);   
    }
    else if(input.ops.length == 0 ){
       pushFirstNumber(numValue);
       display();
       console.log(input);
    }else if (input.ops.length>0) {
        validateSecondNum(numValue); //considering the number input for num2
    }
   
}
// function to validate the input of second number
    function validateSecondNum(numValue) {
        input.num2 = [...input.num2,numValue];
        console.log(input);
        display();
    }

//function to push the capture operations value into input object
function pushOperator(opsValue){
    input.ops = [...input.ops, opsValue];
    console.log(input);
    display();
}


// function to validate the intake of operations 
function validateOps(opsValue){
    if(input.result.length > 0){
        input.num1 = [...input.num1,input.result[0]];
        input.result = [];
        pushOperator(opsValue);
        console.log(input);
        display();
    }
    else if(input.num1.length == 0){
        resetInput();
    }
    else if(input.num1.length > 0 && input.num2.length == 0){
        pushOperator(opsValue);
        console.log(input);
        display();
    }
    else if(input.num2.length > 0){
         calculate();
         input.num1 = [...input.num1,input.result[0]];
         input.result = [];
         pushOperator(opsValue);
         display();
    }
    }

    //function to display objects in screen
    function display(){
        if (input.num1.length > 0 && input.ops.length == 0){
            displayScreen.innerHTML = `<h1>${input.num1.join('')}</h1>`
        }
        else if (input.ops.length > 0 && input.num2.length == 0 ){
            displayScreen.innerHTML = `<h1>${input.num1.join('')} ${input.ops[input.ops.length - 1]}</h1>` 
        }
        else if (input.num2.length > 0){
            displayScreen.innerHTML = `<h1>${input.num1.join('')} ${input.ops[input.ops.length - 1]} ${input.num2.join('')}</h1>` 
        }
        else if(input.result.length > 0){
            displayScreen.innerHTML = `<h1>${input.result.join('')}</h1>`
        } 
        else{
            displayScreen.innerHTML = `<h1></h1>`
        }
}


//Event Listner for capturing numbers
numbers.forEach(numClick =>{
    numClick.addEventListener('click',function(event){
        const numValue =  event.target.textContent;
        validateFirstNum(numValue);
    });

})

//event listners for capturing operations
operators.forEach(opsClick =>{
        opsClick.addEventListener('click',function(){
            const opsValue = this.getAttribute('data-operation');
            validateOps(opsValue);
        })
    })

//event listner when '=' button is clicked
resultEquals.addEventListener('click',function(){
        calculate();
        display(); 
})

// event listner AC button is clicked
allClearText.addEventListener('click',function(){
    resetInput();
    display();
})

// event listner when C button is clicked
clearText.addEventListener('click',function(){
    backspace();
})
