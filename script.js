
const clearText = document.getElementById('clear');//gets the C button
const allClearText = document.getElementById('all-clear');//gets AC button
const opsList = document.querySelectorAll('.operations');// gets all the operator buttons
const numbers = document.querySelectorAll('.numbers');//get all the number buttons
const result = document.getElementById('equates'); // gets the '=' button
const displayScreen = document.querySelector('.display');



/// input numbers and operations as objects



let letsCalculate = true;
let clickCount = 0
let displayEquation = []
let resultCalc = [];
const regex = /[+\-*/]/g;


    // function to update the numbers and operators
    function updateInput(event){
        inputVariable = `${event.target.id}`;
        let inputVariableText = `${event.target.innerText}`;
        if(displayEquation.length == 0){
            if (inputVariable == 'operator'){
                alert('click a no');
                return;
            }
            else{
                displayEquation = [... displayEquation, inputVariableText];
                console.log(displayEquation);
                display()
            }
        }
        else {
            if (inputVariable == 'operator'){
            if (clickCount == 0){
                displayEquation = [... displayEquation, inputVariableText];
                console.log(displayEquation);
                display();
                clickCount++;
            }
            else {
                let newArray = displayEquation.splice(0,displayEquation.length-1);
                displayEquation = [...newArray,inputVariableText];
                console.log(displayEquation);
                clickCount ++;
                display();
            }
          
        }
        else{
                clickCount = 0;
                displayEquation = [... displayEquation, inputVariableText];
                console.log(displayEquation);
                display();
        }
    }
        
    }
    
    // function to introduce a new head element inside the display div
    function display(){
        displayScreen.innerHTML = `<h1>${displayEquation.join('')}</h1>`; 

    }

    // function to reset everything;

    function allClear(){
            num = '';
            opsValues = '';
            displayEquation = [];
            inputVariable = '';
            resultCalc = [];
        clickCount = 0;
            display();
    }

    // function to clear everything

    function clear(){
            let newArray = displayEquation.splice(0,displayEquation.length-1);
            displayEquation = [...newArray,inputVariableText];
    }

    // function to claculate the final result

    function calculateFinalResult() {
        let finalResult = displayEquation.join('');
            displayResult = eval(finalResult);
            displayEquation.push(` = ${displayResult}`);
            display();
            letsCalculate = false;
    }

    // Event Listner Capturing the numbers

    numbers.forEach(function(numClick){
        numClick.addEventListener('click',updateInput);
    })

    opsList.forEach(function(ops){
        ops.addEventListener('click',updateInput);
    })

    //Event Listner capturing the all clear button
    allClearText.addEventListener('click',allClear);

    //Event Listner to capture the equal button
    result.addEventListener('click', calculateFinalResult);

 
    