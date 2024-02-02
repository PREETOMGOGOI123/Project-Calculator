
const clearText = document.getElementById('clear'); //gets the C button
const allClearText = document.getElementById('all-clear');//gets AC button

const operators = document.querySelectorAll('.operator');// get all the operation elements.

const numbers = document.querySelectorAll('.numbers');//get all the number buttons

// selects the equal to button
const resultEquals = document.getElementById('equates'); 
const displayScreen = document.querySelector('.display');//gets the div where result will be displayed

let letsCalculate = true;
let inputNumber;

const input={
    num1 : [],
    ops  : [],
    num2 : []
};


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

function resetInput(){
    if(!letsCalculate){
        input.num1 = [];
        input.num2 = [];
        input.ops = []; 
    }

    else {
        letsCalculate;
    }
}

function equates(){
        let num1 = input.num1.join('');
        let num2 = input.num2.join('');
        let result = operations[input.ops[input.ops.length-1]](num1,num2);
        console.log(result);
        letsCalculate =false;
        resetInput();
        input.num1 = [...input.num1, result];
}

function captureNum(numValue){
    if(!letsCalculate && input.num1.length == 0){
        input.num1 = [...input.num1, parseInt(numValue)];
        letsCalculate = true;
        console.log(input)
    
    }
    else if(!letsCalculate && input.num1.length > 0 ){
        input.num1 = [];
        input.num1 = [...input.num1, parseInt(numValue)];
        letsCalculate = true;
        console.log(input)
    }

    else if(input.ops.length == 0 && letsCalculate){
        input.num1 = [...input.num1, parseInt(numValue)];
        console.log(input)
    }
    
    else if(input.ops.length > 0 && letsCalculate && input.num2.length >= 0){
        input.num2 = [...input.num2, parseInt(numValue)];
        console.log(input)
    }
    
}

function captureOps(opsValue){
    if(!letsCalculate && input.num1.length == 0){
        return;
    }
    else if(!letsCalculate && input.num1.length > 0){
        input.ops = [...input.ops, opsValue];
        letsCalculate = true;
    }
    else if(input.num1.length > 0 && input.num2.length > 0 && input.ops.length>0){
           let num1 = input.num1.join('');
           let num2 = input.num2.join('');
           let result = operations[input.ops[input.ops.length-1]](num1,num2);
           console.log(result);
           letsCalculate =false;
           resetInput();
           input.num1 = [...input.num1, result];
           input.ops = [...input.ops, opsValue];
           console.log(input);
           letsCalculate = true;
    }
        else if(input.num1.length >= 0 && letsCalculate){
            input.ops = [...input.ops,opsValue];
            console.log(input);
        }
    }


numbers.forEach(numClick =>{
    numClick.addEventListener('click',function(event){
        const numValue =  event.target.textContent;
        captureNum(numValue);
    });//eventlistner when any number id clicked

})

operators.forEach(opsClick =>{
        opsClick.addEventListener('click',function(){
            const opsValue = this.getAttribute('data-operation');
            captureOps(opsValue);
        })
    })

allClearText.addEventListener('click',function(){
    letsCalculate = false;
    resetInput();
    console.log(input);
})

resultEquals.addEventListener('click',function(){
    equates();
})